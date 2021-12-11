import type { NextApiRequest, NextApiResponse } from "next";

import { firestore } from "@/utils/firebase/admin";
import { ProjectData } from "@/utils/firebase";
import { ObjectMap } from "@/lib/smarthome";

type handlerType = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

type IncomingData = {
  uid?: string;
  secret?: string;
  data?: ObjectMap<number | boolean | string>;
};

const handler: handlerType = async (req, res) => {
  if (req.method !== "GET" && req.method !== "POST")
    res.status(400).json({ message: "Bad request" });

  // Get data from the request
  const { uid, secret, data: receivedData } = req.body as IncomingData;

  // Check if uid is present and type of string
  if (!uid || typeof uid !== "string")
    return res.status(400).json({ message: "Please send uid" });

  // Check if secret key is present and type of string
  if (!secret || typeof secret !== "string")
    return res.status(403).json({
      message: `Please send secret key${secret ? " as a string" : ""}`,
    });

  const docRef = firestore.collection("projects").doc(uid);

  // GET request
  if (req.method === "GET") {
    return docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // If document exists
          const document = doc.data() as ProjectData;

          // If secret key is correct return data
          if (secret === document.secret)
            return res.status(200).json({ data: document.data });
        }

        // If Document not exists or secret key is incorrect
        return res.status(404).json({ message: "Not Found" });
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        return res.status(500).json({ message: "Something went wrong" });
      });
  }

  // POST request
  else {
    // Check if received data is a object
    if (
      receivedData === null ||
      typeof receivedData !== "object" ||
      Array.isArray(receivedData)
    ) {
      return res
        .status(406)
        .json({ message: "Please send data to be updated" });
    }

    return docRef
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          // If document exists
          const document = doc.data() as ProjectData;

          // Check if secret key is correct
          if (secret === document.secret) {
            const newData: ObjectMap<number | boolean | string> = {};
            const errors = [];

            // Filter the data
            for (const [key, type] of Object.entries(document.endpoints)) {
              // For color endpoint, we need to check if the data type is number
              const newType = type === "color" ? "number" : type;

              // Check for Data Type
              if (typeof receivedData[key] === newType) {
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

            // Save data into database ( error is handled by global error handler )
            await docRef.update({ data: { ...document.data, ...newData } });

            // Return the result
            return res.status(200).json({
              message: errors.length
                ? "Some fields are not updated"
                : "Updated successfully",
              errors: errors.length ? errors : undefined,
            });
          }
        }

        // If Document not exists or secret key is incorrect
        return res.status(404).json({ message: "Not Found" });
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        return res.status(500).json({ message: "Something went wrong" });
      });
  }
};

export default handler;
