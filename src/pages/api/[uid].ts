import type { NextApiRequest, NextApiResponse } from "next";

import { firestore } from "@/utils/firebase/admin";
import { ProjectData } from "@/utils/firebase";

type handlerType = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
type DataType = { [key: string]: number | boolean };

type IncomingData = {
  secret: string;
  data: DataType;
};

const handler: handlerType = async (req, res) => {
  if (req.method !== "POST") res.status(400).json({ message: "Bad request" });

  const { uid } = req.query as { uid: string };
  const { secret, data: receivedData } = req.body as IncomingData;

  // Check if secret key is present and type of string
  if (typeof secret !== "string")
    return res.status(403).json({
      message: `Please send secret key${secret ? " as a string" : ""}`,
    });

  // Check if received data is a object
  if (
    receivedData === null ||
    typeof receivedData !== "object" ||
    Array.isArray(receivedData)
  ) {
    return res.status(406).json({ message: "Please send data to be updated" });
  }

  const docRef = firestore.collection("projects").doc(uid);

  docRef
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        // If Document exists
        const document = doc.data() as ProjectData;

        if (secret === document.secret) {
          const newData: DataType = {};
          const errors = [];

          // Filter the data
          for (const [key, type] of Object.entries(document.endpoints)) {
            // Check for Data Type
            if (typeof receivedData[key] === type) {
              newData[key] = receivedData[key];
            } else {
              if (typeof receivedData[key] != "undefined")
                // If received data type is wrong
                errors.push({
                  field: key,
                  error: `expected a ${type} value`,
                });
            }
          }

          // If there is nothing to update
          if (Object.keys(newData).length === 0) {
            return res
              .status(406)
              .json({ message: "Nothing is updated", errors });
          }

          // Save data into database
          await docRef.update({ data: { ...document.data, ...newData } });

          // If errors present
          if (errors.length)
            return res.status(200).json({
              message: "Some fields are not updated",
              errors,
            });

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
