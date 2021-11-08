import { NextApiRequest, NextApiResponse } from "next";
import { smarthome, SmartHomeV1SyncDevices } from "@/lib/smarthome";
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
      customData: device.data,
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
  console.log({ body, uid });
  // TODO Get device state
  return {
    requestId: body.requestId,
    payload: {
      devices: {
        123: {
          on: true,
          online: true,
        },
        456: {
          on: true,
          online: true,
          brightness: 80,
          color: {
            name: "cerulean",
            spectrumRGB: 31655,
          },
        },
      },
    },
  };
});

// export default app.handler;

export const handler: handlerType = (req, res) => {
  return app.handler(req, res);
};

export default handler;
