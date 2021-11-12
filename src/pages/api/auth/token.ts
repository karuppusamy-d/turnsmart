import type { NextApiRequest, NextApiResponse } from "next";
import { sign, verify } from "jsonwebtoken";
import { createHash } from "crypto";
import { firestore } from "@/utils/firebase/admin";

type handlerType = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void | NextApiResponse>;

type IncomingQuerys = {
  client_id?: string;
  client_secret?: string;
  grant_type?: "authorization_code" | "refresh_token";
  code?: string;
  redirect_uri?: string;
  refresh_token?: string;
};

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

const handler: handlerType = async (req, res) => {
  if (req.method !== "POST")
    return res.status(400).json({ error: "method_not_allowed" });

  const { client_id, client_secret, grant_type } = req.body as IncomingQuerys;

  // Check if request is valid
  const isValidRequest =
    client_id === GOOGLE_CLIENT_ID &&
    client_secret === GOOGLE_CLIENT_SECRET &&
    (grant_type === "authorization_code" || grant_type === "refresh_token");

  // If request is not valid, return error
  if (!isValidRequest) return res.status(400).json({ error: "invalid_grant" });

  if (grant_type === "authorization_code") {
    //  Check if code is valid
    if (!req.body.code) return res.status(400).json({ error: "invalid_grant" });

    // create hash from code
    const hashedCode = createHash("sha256").update(req.body.code).digest("hex");

    // Get doc ref from user id
    const docRef = firestore
      .collection("authorization_codes")
      .where("authorization_code", "==", hashedCode);

    await docRef
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty || querySnapshot.docs[0].exists === false) {
          return res.status(400).json({ error: "invalid_grant" });
        }

        const doc = querySnapshot.docs[0];

        // Get user id
        const { uid } = doc.data();

        // Delete doc
        doc.ref.delete();

        if (uid) {
          // Create token
          const access_token = sign({ uid }, JWT_SECRET, { expiresIn: "1h" });
          const refresh_token = sign({ uid, refresh_token: true }, JWT_SECRET);

          // Return response
          return res.status(200).json({
            access_token,
            refresh_token,
            token_type: "Bearer",
            expires_in: 3600,
          });
        } else return res.status(400).json({ error: "invalid_grant" });
      })
      .catch(() => res.status(500).json({ error: "server_error" }));
  } else {
    // Create a token from refresh token
    try {
      // Verify refresh token
      const { uid, refresh_token } = verify(
        req.body.refresh_token,
        JWT_SECRET
      ) as {
        uid?: string;
        refresh_token?: boolean;
      };

      if (uid && refresh_token) {
        // Create token
        const access_token = sign({ uid }, JWT_SECRET, { expiresIn: "1h" });

        // Return response
        return res.status(200).json({
          access_token,
          token_type: "Bearer",
          expires_in: 3600,
        });
      } else return res.status(400).json({ error: "invalid_grant" });
    } catch (err) {
      return res.status(400).json({ error: "invalid_grant" });
    }
  }
};

export default handler;
