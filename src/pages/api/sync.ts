import { NextApiRequest, NextApiResponse } from "next";
import { homegraph } from "@googleapis/homegraph";
import { GoogleAuth } from "google-auth-library";
import { auth } from "@/utils/firebase/admin";

type handlerType = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const handler: handlerType = async (req, res) => {
  // if authorization header is not present
  if (typeof req.headers.authorization !== "string")
    return res.status(400).json({ message: "Bad request" });

  await auth
    .verifyIdToken(req.headers.authorization)
    .then(async ({ uid }) => {
      const homegraphClient = homegraph({
        version: "v1",
        auth: new GoogleAuth({
          scopes: "https://www.googleapis.com/auth/homegraph",
          credentials: {
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(
              /\\n/g,
              "\n"
            ),
          },
        }),
      });

      await homegraphClient.devices
        .requestSync({
          requestBody: {
            agentUserId: uid,
            async: false,
          },
        })
        .then(() => {
          res.status(200).json({ result: "success" });
        })
        .catch(() => {
          res.status(400).json({ result: "failed" });
        });
    })
    .catch(() => {
      res.status(401).send("Authentication Falied");
    });
};

export default handler;
