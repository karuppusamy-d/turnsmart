import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

import {
  SmartHomeV1DisconnectRequest,
  SmartHomeV1DisconnectResponse,
  SmartHomeV1ExecuteRequest,
  SmartHomeV1ExecuteResponse,
  SmartHomeV1Intents,
  SmartHomeV1QueryRequest,
  SmartHomeV1QueryResponse,
  SmartHomeV1Request,
  SmartHomeV1Response,
  SmartHomeV1SyncRequest,
  SmartHomeV1SyncResponse,
} from ".";

type Handler<Request = SmartHomeV1Request, Response = SmartHomeV1Response> = (
  req: Request,
  uid: string
) => Promise<Response>;

type SmartHomeHandlers = { [intent: string]: Handler };

export interface SmartHomeApp {
  /** @hidden */
  _intents: SmartHomeHandlers;
  /** @hidden */
  _intent(intent: SmartHomeV1Intents, handler: Handler): this;

  onSync(
    this: SmartHomeApp,
    handler: Handler<SmartHomeV1SyncRequest, SmartHomeV1SyncResponse>
  ): this;

  onQuery(
    this: SmartHomeApp,
    handler: Handler<SmartHomeV1QueryRequest, SmartHomeV1QueryResponse>
  ): this;

  onExecute(
    this: SmartHomeApp,
    handler: Handler<SmartHomeV1ExecuteRequest, SmartHomeV1ExecuteResponse>
  ): this;

  onDisconnect(
    this: SmartHomeApp,
    handler: Handler<
      SmartHomeV1DisconnectRequest,
      SmartHomeV1DisconnectResponse
    >
  ): this;

  handler(
    this: SmartHomeApp,
    body: NextApiRequest,
    res: NextApiResponse
  ): Promise<void>;
}

export const smarthome = (jwt_secret: string): SmartHomeApp => {
  return {
    _intents: {},
    _intent(intent, handler) {
      this._intents[intent] = handler;
      return this;
    },
    onSync(handler) {
      return this._intent("action.devices.SYNC", handler);
    },
    onQuery(handler) {
      return this._intent("action.devices.QUERY", handler as Handler);
    },
    onExecute(handler) {
      return this._intent("action.devices.EXECUTE", handler as Handler);
    },
    onDisconnect(handler) {
      return this._intent("action.devices.DISCONNECT", handler as Handler);
    },

    async handler({ body, headers }, res) {
      try {
        const { intent } = body.inputs[0];
        const token = (headers?.authorization || "").split(" ")[1];

        const { uid } = verify(token, jwt_secret) as { uid?: string };

        if (!uid) throw new Error("Unauthorized");

        const handler = this._intents[intent];

        return res.json(await handler(body, uid));
      } catch (err: any) {
        console.log(err.name);
        if (err.name == "TokenExpiredError") {
          res.setHeader("WWW-Authenticate", `error="invalid_token"`);
          return res.status(401).send("The Access Token expired");
        }
        return res.status(401).send("Unauthorized");
      }
    },
  };
};