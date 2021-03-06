import { ObjectMap } from "./types";

/*
  deviceCommands is a map of device commands.
  It is used in onExecute event to process the data and return response.

  {
    "command_name": {
      trait: "target_trait",
      target?: "target state used to get previous value",
      default?: () => {
        // default callback function ( executed always )
        return { state: value } 
      },
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
      return {
        spectrumRgb: value.spectrumRGB,
        color: { spectrumRgb: value.spectrumRGB },
      };
    },
  },

  /* action.devices.traits.Dock */
  "action.devices.commands.Dock": {
    trait: "action.devices.traits.Dock",
    target: "isDocked",
    defalut: (_value: boolean, previousValue: boolean) => {
      return { isDocked: !previousValue };
    },
  },

  /* action.devices.traits.FanSpeed */
  "action.devices.commands.SetFanSpeed": {
    trait: "action.devices.traits.FanSpeed",
    // fanSpeed: (value: string) => {
    //   return { fanSpeed: value };
    // },
    fanSpeedPercent: (value: number) => {
      return {
        on: true,
        currentFanSpeedPercent: value,
        fanSpeedPercent: value,
      };
    },
  },
  "action.devices.commands.Reverse": {
    trait: "action.devices.traits.FanSpeed",
    target: "reverse",
    defalut: (_value: boolean, previousValue: boolean) => {
      return { on: true, reverse: !previousValue };
    },
  },

  /* action.devices.traits.Volume */
  "action.devices.commands.setVolume": {
    trait: "action.devices.traits.Volume",
    volumeLevel: (value: number) => {
      return { currentVolume: value, volumeLevel: value };
    },
  },
  "action.devices.commands.volumeRelative": {
    trait: "action.devices.traits.Volume",
    target: "currentVolume",
    relativeSteps: (value: number, curr: number) => {
      return { currentVolume: value + curr };
    },
  },
  "action.devices.commands.mute": {
    trait: "action.devices.traits.Volume",
    mute: (value: boolean) => {
      return { isMuted: value, mute: value };
    },
  },
} as const;

export type DeviceCommands = keyof typeof deviceCommands;
