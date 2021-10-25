import type { NextApiRequest, NextApiResponse } from "next";

import { firestore } from "@/utils/firebase/admin";
import { ProjectData } from "@/utils/firebase";

type handlerType = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

type IncomingData = {
  secret: string;
};

const handler: handlerType = async (req, res) => {
  if (req.method !== "GET") res.status(400).json({ message: "Bad request" });

  const { uid } = req.query as { uid: string };
  const { secret } = req.body as IncomingData;

  // Check if secret key is present and type of string
  if (typeof secret !== "string")
    return res.status(403).json({
      message: `Please send secret key${secret ? " as a string" : ""}`,
    });

  const docRef = firestore.collection("projects").doc(uid);

  docRef
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        // If Document exists
        const document = doc.data() as ProjectData;

        if (secret === document.secret) {
          return res.status(200).json({ data: document.data });
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
