import type { NextApiRequest, NextApiResponse } from "next";

import { auth, firestore } from "@/utils/firebase/admin";
import randomPassword from "@/lib/randomPassword";
import { createHash } from "crypto";

type handlerType = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void | NextApiResponse>;

type IncomingAuthQuerys = {
  client_id?: string;
  redirect_uri?: string;
  state?: string;
  scope?: string;
  response_type?: string;
  user_locale?: string;
};

const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI as string;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;

const handler: handlerType = async (req, res) => {
  if (req.method !== "POST") return res.status(400).send("Method not allowed");

  // Get data from request
  const { client_id, redirect_uri, state } = req.body as IncomingAuthQuerys;

  // Check if request is valid
  const isValidRequest =
    client_id === GOOGLE_CLIENT_ID &&
    redirect_uri === GOOGLE_REDIRECT_URI &&
    state;

  // If request is not valid, return error
  if (!isValidRequest) return res.status(400).send("Bad Request");

  await auth
    .verifyIdToken(req.headers.authorization as string)
    .then(async ({ uid }) => {
      // Get doc ref from user id
      const docRef = firestore.collection("authorization_codes").doc(uid);

      // Create new authorization code
      const authorization_code = randomPassword(10);

      const hashedCode = createHash("sha256")
        .update(authorization_code)
        .digest("hex");

      // Save authorization code to database
      await docRef.set({ uid, authorization_code: hashedCode });

      // Send response
      return res.status(200).json({
        redirect_url: `${redirect_uri}?code=${authorization_code}&state=${state}`,
      });
    })

    // On authenication error
    .catch(() => res.status(401).send("Authentication Falied"));
};

export default handler;
