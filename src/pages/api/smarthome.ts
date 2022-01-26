import { NextApiRequest, NextApiResponse } from "next";
import {
  ObjectMap,
  smarthome,
  SmartHomeExecuteResponseCommands,
  SmartHomeQueryDevices,
  SmartHomeSyncDevices,
} from "@/lib/smarthome";
import { ProjectData } from "@/utils/firebase";
import { firestore } from "@/utils/firebase/admin";
import asyncPromiseMap from "@/lib/asyncPromiseMap";
import { deviceTraits, DeviceTraits } from "@/lib/smarthome/deviceTraits";
import { DeviceCommands, deviceCommands } from "@/lib/smarthome/deviceCommands";

type handlerType = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const jwt_secret = process.env.JWT_SECRET as string;
const app = smarthome(jwt_secret);

app.onSync(async (body, uid) => {
  const docsRef = firestore.collection("projects").where("userid", "==", uid);
  const docsSnapsot = await docsRef.get();

  const docs = docsSnapsot.docs.map((doc) => {
    return { ...(doc.data() as ProjectData), uid: doc.id };
  });

  const devices = docs
    .filter((device) => device.smarthome.enabled)
    .map((device): SmartHomeSyncDevices => {
      const traits = Object.keys(device.smarthome.traits) as DeviceTraits[];

      return {
        id: device.uid,
        type: device.smarthome.type,
        traits: traits,
        name: {
          name: device.name, // Primary name of the device provided by the user for the device.
          nicknames: device.smarthome.nicknames, // Additional names provided by the user for the device.
          defaultNames: [device.name], // List of names provided by the developer for the device.
        },
        willReportState: false,
        deviceInfo: {
          manufacturer: "turnsmart.io",
          model: device.name,
          hwVersion: "1.0",
          swVersion: "1.0",
        },
        attributes: getAttributes(traits),
      };
    });

  return {
    requestId: body.requestId,
    payload: {
      agentUserId: uid,
      devices,
    },
  };
});

app.onQuery(async (body, uid) => {
  const payload = body.inputs[0].payload;

  const docsRef = firestore.collection("projects").where("userid", "==", uid);
  const docsSnapsot = await docsRef.get();

  const docs = docsSnapsot.docs.map((doc) => {
    return { ...(doc.data() as ProjectData), uid: doc.id };
  });

  const devices: SmartHomeQueryDevices = {};

  payload.devices.forEach((device) => {
    const doc = docs.find((doc) => doc.uid === device.id);

    if (doc?.smarthome.enabled) {
      const data = getQueryData(doc);

      devices[device.id] = {
        online: true,
        status: "SUCCESS",
        ...data,
      };
    } else {
      devices[device.id] = {
        online: false,
        status: "ERROR",
      };
    }
  });

  return {
    requestId: body.requestId,
    payload: {
      devices,
    },
  };
});

app.onExecute(async ({ requestId, inputs }, uid) => {
  const commands = inputs[0].payload.commands;

  // Using asyncPromiseMap to execute commands in parallel
  const res = await asyncPromiseMap(commands, (command) => {
    return asyncPromiseMap(command.devices, async ({ id }) => {
      try {
        // Fetches the device data from firestore
        const docRef = firestore.collection("projects").doc(id);
        const docSnapshot = await docRef.get();
        const doc = docSnapshot.data() as ProjectData | undefined;

        // Throws an error if the device is not found or user is not authorized
        if (!doc || doc.userid !== uid)
          throw new Error("Unauthorized / Document not exist");

        // Get Command Name from the request. ex: action.devices.commands.OnOff
        const commandName = command.execution[0].command as DeviceCommands;

        const trait = deviceCommands[commandName]["trait"] as DeviceTraits;
        const targets = doc.smarthome.traits[trait];

        // Get the callback functions for the command.
        const callbacks = deviceCommands[commandName];

        let result: ObjectMap = {};

        if (command.execution[0].params instanceof Object) {
          // Loop through all the params and call the callback functions
          Object.entries(command.execution[0].params).forEach(
            // [key = on | isRunning | isPaused | brightness, value = boolean | number | string ]
            ([key, value]) => {
              // @ts-expect-error: Let's ignore this type error for now
              const callback = callbacks[key];
              if (callback instanceof Function) {
                // @ts-expect-error: Let's ignore this type error for now
                const preValue = callbacks.target
                  ? // @ts-expect-error: Let's ignore this type error for now
                    doc.data[targets[callbacks.target] || ""]
                  : "";

                const res = callback(value, preValue || 0) as ObjectMap;
                result = { ...result, ...res };
              }
            }
          );
        }

        // @ts-expect-error: Let's ignore this type error for now
        const defaultCallback = callbacks["defalut"];

        // If defalut callback function exists, execute it
        if (defaultCallback instanceof Function) {
          // @ts-expect-error: Let's ignore this type error for now
          const preValue = callbacks.target
            ? // @ts-expect-error: Let's ignore this type error for now
              doc.data[targets[callbacks.target] || ""]
            : "";

          const res = defaultCallback(false, preValue || 0) as ObjectMap;
          result = { ...result, ...res };
        }

        // Store Data in Firestore
        let newData = {};
        Object.entries(result).forEach(([key, value]) => {
          // @ts-expect-error: Let's ignore this type error for now
          const newKey = targets[key];

          if (newKey) newData = { ...newData, [newKey]: value };
        });

        await docRef.update({
          data: { ...doc.data, ...newData },
        });

        return {
          ids: [id],
          status: "SUCCESS",
          states: {
            ...result,
            online: true,
          },
        } as SmartHomeExecuteResponseCommands;
      } catch (e) {
        console.error(e);

        return {
          ids: [id],
          status: "ERROR",
          errorCode: "Unauthorized / Document not exist",
        } as SmartHomeExecuteResponseCommands;
      }
    });
  });

  return {
    requestId: requestId,
    payload: {
      // TODO: Comibine common commands using id
      commands: res.reduce((acc, cur) => acc.concat(cur), []),
    },
  };
});

app.onDisconnect(async () => {
  return {};
});

// Helper Functions
const getQueryData = (doc: ProjectData): ObjectMap => {
  // Loop throught all the traits and get the data
  const res: ObjectMap = {};

  const traits = Object.keys(doc.smarthome.traits) as DeviceTraits[];
  traits.forEach((trait) => {
    // Get the trait states
    const states = deviceTraits[trait].states;

    states.forEach(([state, , wrapper]) => {
      // @ts-expect-error: Let's ignore this type error for now
      const target: string | undefined = doc.smarthome.traits[trait][state];

      if (target) {
        if (wrapper) res[target] = { [state]: doc.data[target] };
        else res[state] = doc.data[target];
      }
    });
  });

  return res;
};

const getAttributes = (traits: DeviceTraits[]): ObjectMap => {
  let attributes = {};

  traits.forEach((trait) => {
    const traitAttributes = deviceTraits[trait as DeviceTraits].attributes;
    if (attributes) {
      attributes = { ...attributes, ...traitAttributes };
    }
  });
  return attributes;
};

// Exports
const handler: handlerType = (req, res) => {
  return app.handler(req, res);
};
export default handler;
