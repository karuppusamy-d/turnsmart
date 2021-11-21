import { ObjectMap } from ".";

/*
  deviceCommands is a map of device commands.
  It is used in onExecute event to process the data and return response.

  {
    "command_name": {
      trait: "target_trait",
      callbacks: (value) => {
        // Callback function for the command.
        return { state: value }
      }
    }
  }
*/

export const deviceCommands = {
  /* action.devices.traits.OnOff */
  "action.devices.commands.OnOff": {
    trait: "action.devices.traits.OnOff",
    on: (value: boolean) => {
      return { on: value };
    },
  },

  /* action.devices.traits.StartStop */
  "action.devices.commands.StartStop": {
    trait: "action.devices.traits.StartStop",
    start: (value: boolean) => {
      return { isRunning: value };
    },
  },
  // Not used by google home when "pausable": true' is not set
  // "action.devices.commands.PauseUnpause": {
  //   trait: "action.devices.traits.StartStop",
  //   pause: (value: boolean) => {
  //     return { isRunning: !value, isPaused: value };
  //   },
  // },

  /* action.devices.traits.Brightness */
  "action.devices.commands.BrightnessAbsolute": {
    trait: "action.devices.traits.Brightness",
    brightness: (value: number) => {
      return { on: true, brightness: value };
    },
  },
  // Not used by google home when "commandOnlyBrightness": true' is not set
  // "action.devices.commands.BrightnessRelative": {
  //   trait: "action.devices.traits.Brightness",
  //   target: "brightness",
  //   brightnessRelativePercent: (value: number, previousValue = 0) => {
  //     return {
  //       on: true,
  //       brightness: previousValue + (previousValue * value) / 100,
  //     };
  //   },
  //   brightnessRelativeWeight: (value: number, previousValue = 0) => {
  //     return { on: true, brightness: previousValue + value };
  //   },
  // },

  /* action.devices.traits.ColorSetting */
  "action.devices.commands.ColorAbsolute": {
    trait: "action.devices.traits.ColorSetting",
    color: (value: ObjectMap) => {
      return { spectrumRGB: value.spectrumRGB, color: value };
    },
  },
} as const;

export type DeviceCommands = keyof typeof deviceCommands;
