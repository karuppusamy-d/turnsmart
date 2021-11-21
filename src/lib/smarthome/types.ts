import { NextApiRequest, NextApiResponse } from "next";

export type ObjectMap<TValue = number | string | boolean | any> = {
  [key: string]: TValue;
};

// See https://developers.google.com/actions/smarthome/

export type SmartHomeIntents =
  | "action.devices.SYNC"
  | "action.devices.QUERY"
  | "action.devices.EXECUTE"
  | "action.devices.DISCONNECT";

// See an extensive list of error codes at
// https://developers.google.com/actions/reference/smarthome/errors-exceptions
export type SmartHomeExecuteErrors = string;

export interface SmartHomeSyncRequestInputs {
  intent: SmartHomeIntents;
}

export interface SmartHomeSyncRequest {
  requestId: string;
  inputs: SmartHomeSyncRequestInputs[];
}

export interface SmartHomeQueryRequestDevices {
  id: string;
  customData?: ObjectMap<any>;
}

export interface SmartHomeQueryRequestInputs {
  intent: SmartHomeIntents;
  payload: {
    devices: SmartHomeQueryRequestDevices[];
  };
}

export interface SmartHomeQueryRequest {
  requestId: string;
  inputs: SmartHomeQueryRequestInputs[];
}

export interface SmartHomeExecuteRequestExecution {
  command: string;
  params?: ObjectMap<any>;
  challenge?: {
    pin?: string;
    ack?: boolean;
  };
}

export interface SmartHomeExecuteRequestCommands {
  devices: SmartHomeQueryRequestDevices[];
  execution: SmartHomeExecuteRequestExecution[];
}

export interface SmartHomeExecuteRequestInputs {
  intent: SmartHomeIntents;
  payload: {
    commands: SmartHomeExecuteRequestCommands[];
  };
}

export interface SmartHomeExecuteRequest {
  requestId: string;
  inputs: SmartHomeExecuteRequestInputs[];
}

export interface SmartHomeDisconnectRequest {
  requestId: string;
  inputs: {
    intent: "action.devices.DISCONNECT";
  }[];
}

export interface SmartHomeSyncDevices {
  id: string;
  type: string;
  traits: string[];
  name: {
    defaultNames: string[];
    name: string;
    nicknames: string[];
  };
  willReportState: boolean;
  deviceInfo?: {
    manufacturer: string;
    model: string;
    hwVersion: string;
    swVersion: string;
  };
  attributes?: ObjectMap<any>;
  customData?: ObjectMap<any>;
  roomHint?: string;
  otherDeviceIds?: {
    agentId?: string;
    deviceId: string;
  }[];
}

export interface SmartHomeSyncResponse {
  requestId: string;
  payload: {
    agentUserId?: string;
    errorCode?: string;
    debugString?: string;
    devices: SmartHomeSyncDevices[];
  };
}

export type SmartHomeQueryDevices = {
  [key: string]: {
    online: boolean;
    status: "SUCCESS" | "ERROR" | "OFFLINE" | "EXCEPTIONS";
    [key: string]: number | string | boolean | any[];
  };
};

export interface SmartHomeQueryResponse {
  requestId: string;
  payload: {
    devices: SmartHomeQueryDevices;
  };
}

export interface SmartHomeExecuteResponseCommands {
  ids: string[];
  status: "SUCCESS" | "PENDING" | "OFFLINE" | "ERROR";
  errorCode?: SmartHomeExecuteErrors;
  debugString?: string;
  states?: ObjectMap<any>;
  challengeNeeded?: {
    type: "ackNeeded" | "pinNeeded" | "challengeFailedPinNeeded";
  };
}

export interface SmartHomeExecuteResponse {
  requestId: string;
  payload: {
    commands: SmartHomeExecuteResponseCommands[];
    errorCode?: SmartHomeExecuteErrors;
    debugString?: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SmartHomeDisconnectResponse {}

export type SmartHomeRequest =
  | SmartHomeSyncRequest
  | SmartHomeQueryRequest
  | SmartHomeExecuteRequest
  | SmartHomeDisconnectRequest;

export type SmartHomeResponse =
  | SmartHomeSyncResponse
  | SmartHomeQueryResponse
  | SmartHomeExecuteResponse
  | SmartHomeDisconnectResponse;

export type Handler<
  Request = SmartHomeRequest,
  Response = SmartHomeResponse
> = (req: Request, uid: string) => Promise<Response>;

export interface SmartHomeApp {
  /** @hidden */
  _intents: { [intent: string]: Handler };
  /** @hidden */
  _intent(intent: SmartHomeIntents, handler: Handler): this;

  onSync(
    this: SmartHomeApp,
    handler: Handler<SmartHomeSyncRequest, SmartHomeSyncResponse>
  ): this;

  onQuery(
    this: SmartHomeApp,
    handler: Handler<SmartHomeQueryRequest, SmartHomeQueryResponse>
  ): this;

  onExecute(
    this: SmartHomeApp,
    handler: Handler<SmartHomeExecuteRequest, SmartHomeExecuteResponse>
  ): this;

  onDisconnect(
    this: SmartHomeApp,
    handler: Handler<SmartHomeDisconnectRequest, SmartHomeDisconnectResponse>
  ): this;

  handler(
    this: SmartHomeApp,
    body: NextApiRequest,
    res: NextApiResponse
  ): Promise<void>;
}
