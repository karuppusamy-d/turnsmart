import { NextApiRequest, NextApiResponse } from "next";
import {
  smarthome,
  SmartHomeV1ExecuteResponseCommands,
  SmartHomeV1SyncDevices,
} from "@/lib/smarthome";
import { ProjectData } from "@/utils/firebase";
import { firestore } from "@/utils/firebase/admin";
import asyncPromiseMap from "@/lib/asyncPromiseMap";

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
    .map((device): SmartHomeV1SyncDevices => {
      return {
        id: device.uid,
        type: device.smarthome.type,
        traits: device.smarthome.traits,
        name: {
          name: device.name, // Primary name of the device provided by the user for the device.
          nicknames: device.smarthome.nicknames, // Additional names provided by the user for the device.
          defaultNames: [device.name], // List of names provided by the developer for the device.
        },
        willReportState: false,
        deviceInfo: {
          manufacturer: "io.karuppusamy.me",
          model: device.name,
          hwVersion: "1.0",
          swVersion: "1.0",
        },
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
  const docsRef = firestore.collection("projects").where("userid", "==", uid);
  const docsSnapsot = await docsRef.get();

  const docs = docsSnapsot.docs.map((doc) => {
    return { ...(doc.data() as ProjectData), uid: doc.id };
  });

  const devices = {} as { [key: string]: any };

  body.inputs[0].payload.devices.forEach((device) => {
    const doc = docs.find((doc) => doc.uid === device.id);
    if (doc) {
      devices[device.id] = {
        online: true,
        status: "SUCCESS",
        on: doc.data[doc.smarthome.target],
      };
    }
  });

  // TODO Get device state
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
        const docRef = firestore.collection("projects").doc(id);
        const docSnapshot = await docRef.get();
        const doc = docSnapshot.data() as ProjectData;

        // Save data to firestore
        if (!doc || doc.userid !== uid)
          throw new Error("Unauthorized / Document not exist");

        const target = doc.smarthome.target;
        const value = command.execution[0].params?.on;

        await docRef.update({
          data: { ...doc.data, [target]: value },
        });

        return {
          ids: [id],
          status: "SUCCESS",
          states: {
            on: value,
            online: true,
          },
        } as SmartHomeV1ExecuteResponseCommands;
      } catch (e) {
        return {
          ids: [id],
          status: "ERROR",
          errorCode: "Unauthorized / Document not exist",
        } as SmartHomeV1ExecuteResponseCommands;
      }
    });
  });

  // Same Using Promise.then
  // const res = await asyncPromiseMap(commands, (command) => {
  //   return asyncPromiseMap(command.devices, ({ id }) => {
  //     const docRef = firestore.collection("projects").doc(id);

  //     // Save data to firestore
  //     const res = docRef
  //       .get()
  //       .then((docSnapshot) => docSnapshot.data() as ProjectData | undefined)
  //       .then((doc) => {
  //         if (!doc || doc.userid !== uid)
  //           throw new Error("Unauthorized / Document not exist");

  //         const target = doc.smarthome.target;
  //         const value = command.execution[0].params?.on;

  //         return docRef
  //           .update({ data: { ...doc.data, [target]: value } })
  //           .then(() => {
  //             return {
  //               ids: [id],
  //               status: "SUCCESS",
  //               states: {
  //                 on: command.execution[0].params?.on,
  //                 online: true,
  //               },
  //             };
  //           });
  //       })
  //       .catch(() => {
  //         return {
  //           ids: [id],
  //           status: "ERROR",
  //           errorCode: "Unauthorized / Document not exist",
  //         };
  //       });

  //     // Return the result
  //     return res as Promise<SmartHomeV1ExecuteResponseCommands>;
  //   });
  // });

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

// Exports
const handler: handlerType = (req, res) => {
  return app.handler(req, res);
};
export default handler;
