import type { NextApiRequest, NextApiResponse } from "next";

import { firestore } from "@/utils/firebase/admin";

type handlerType = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

type IncomingData = {
  secret: string;
  data: { [key: string]: number | boolean };
};

type QueryData = {
  userid: string;
  secret: string;
  data: {
    [key: string]: number | boolean;
  };
};

const handler: handlerType = async (req, res) => {
  if (req.method !== "POST") res.status(400).json({ message: "Bad request" });

  const { uid } = req.query as { uid: string };
  const { secret, data } = req.body as IncomingData;

  if (!secret)
    return res.status(403).json({ message: "Please send secret key" });

  if (!data) return res.status(400).json({ message: "Please send data" });

  const docRef = firestore.collection("data").doc(uid);

  docRef
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        // If Document exists
        const document = doc.data() as QueryData;

        if (secret === document.secret) {
          // Save data into database
          const newData = { ...document.data, ...data };
          await docRef.update({ data: newData });

          return res.status(200).json({ message: "Updated successfully" });
        }
        // return res.status(401).json({ message: "Unauthorized" });
        return res.status(404).json({ message: "Not Found" });
      } else {
        // If Document not exists
        return res.status(404).json({ message: "Not Found" });
      }
    })
    .catch((error) => {
      console.log("Something went wrong", error);
      return res.status(500).json({ message: "Something went wrong" });
    });
};

export default handler;
