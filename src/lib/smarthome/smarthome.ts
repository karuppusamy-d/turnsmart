import { verify } from "jsonwebtoken";

import { SmartHomeApp, Handler } from "./types";

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

        const result = await handler(body, uid);
        // TODO: Remove console log
        console.log(JSON.stringify({ body, result }));

        return res.json(result);
      } catch (err: any) {
        console.error(err.name);
        if (err.name == "TokenExpiredError") {
          res.setHeader("WWW-Authenticate", `error="invalid_token"`);
          return res.status(401).send("The Access Token expired");
        }
        return res.status(401).send("Unauthorized");
      }
    },
  };
};
