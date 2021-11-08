import { NextApiRequest, NextApiResponse } from "next";
import {
  smarthome,
  SmartHomeV1ExecuteResponseCommands,
  SmartHomeV1SyncDevices,
} from "@/lib/smarthome";
import { ProjectData } from "@/utils/firebase";
import { firestore } from "@/utils/firebase/admin";

type handlerType = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const jwt_secret = process.env.JWT_SECRET as string;
const app = smarthome(jwt_secret);

app.onSync(async (body, uid) => {
  const docsRef = firestore.collection("projects").where("userid", "==", uid);
  const docsSnapsot = await docsRef.get();

  const docs = docsSnapsot.docs.map((doc) => {
    return { ...(doc.data() as ProjectData), uid: doc.id };
  });

  const devices = docs.map((device): SmartHomeV1SyncDevices => {
    // TODO: SKIP DEVICES THAT DONT HAVE device.smarthome.type
    return {
      id: device.uid,
      type: device.smarthome.type,
      traits: device.smarthome.traits,
      name: {
        defaultNames: [device.name],
        name: device.name,
        nicknames: [device.name],
      },
      willReportState: true,
      roomHint: "home",
      deviceInfo: {
        manufacturer: "io.karuppusamy.me",
        model: device.name,
        hwVersion: "1.0",
        swVersion: "1.0",
      },
      customData: {
        on: device.data[device.smarthome.target],
      },
    };
  });
  // devices: [
  //   {
  //     id: "123",
  //     type: "action.devices.types.OUTLET",
  //     traits: ["action.devices.traits.OnOff"],
  //     name: {
  //       defaultNames: ["My Outlet 1234"],
  //       name: "Night light",
  //       nicknames: ["wall plug"],
  //     },
  //     willReportState: false,
  //     roomHint: "kitchen",
  //     deviceInfo: {
  //       manufacturer: "lights-out-inc",
  //       model: "hs1234",
  //       hwVersion: "3.2",
  //       swVersion: "11.4",
  //     },
  //     otherDeviceIds: [
  //       {
  //         deviceId: "local-device-id",
  //       },
  //     ],
  //     customData: {
  //       fooValue: 74,
  //       barValue: true,
  //       bazValue: "foo",
  //     },
  //   },
  // ],

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
  const commands: SmartHomeV1ExecuteResponseCommands[] = [];

  await inputs[0].payload.commands.forEach(async (command) => {
    const ids = command.devices.map((device) => device.id);

    ids.forEach(async (id) => {
      const docRef = firestore.collection("projects").doc(id);
      const docSnapshot = await docRef.get();
      const doc = docSnapshot.data() as ProjectData;

      if (doc && doc.userid === uid) {
        const target = doc.smarthome.target;
        const value = command.execution[0].params?.on;

        await docRef.update({ data: { ...doc.data, [target]: value } });
      } else {
        // TODO: Handle error
        commands.push({
          ids: ids,
          status: "ERROR",
          errorCode: "Unauthorized / Document not exist",
        });
      }
    });
    commands.push({
      ids: ids,
      status: "SUCCESS",
      states: { on: command.execution[0].params?.on, online: true },
    });
  });
  // TODO Get device state
  return {
    requestId: requestId,
    payload: {
      commands: commands,
    },
  };
});

app.onDisconnect(async () => {
  return {};
});
// export default app.handler;

export const handler: handlerType = (req, res) => {
  return app.handler(req, res);
};

export default handler;
