/*
  deviceTraits variable is a map of device traits. 
  It is used in onQuery for getting the target in traits object in firebase
  
  {
    "trait_name": {
      name: "name",
      states: [ [ "target_state" , "type" , "wrapper" ] ],
      attributes: { ...default_attributes },
      description: "description",
    }
  }
*/

export const deviceTraits = {
  "action.devices.traits.OnOff": {
    name: "On / Off",
    states: [["on", "boolean"]],
    attributes: {},
    description:
      "The basic on and off functionality for any device that has binary on and off, including plugs and switches as well as many future devices.",
  },

  "action.devices.traits.StartStop": {
    name: "Start / Stop",
    states: [["isRunning", "boolean"]],
    attributes: {},
    description:
      "Starting and stopping a device serves a similar function to turning it on and off. Devices that inherit this trait function differently when turned on and when started. Unlike devices that simply have an on and off state, some devices that can start and stop are also able to pause while performing operation.",
  },

  "action.devices.traits.Brightness": {
    name: "Brightness",
    states: [["brightness", "number"]],
    attributes: {},
    description:
      "Absolute brightness setting is in a normalized range from 0 to 100 (individual lights may not support every point in the range based on their LED configuration).",
  },

  "action.devices.traits.ColorSetting": {
    name: "Color",
    states: [["spectrumRgb", "color", "color"]],
    attributes: { colorModel: "rgb" },
    description:
      "This trait applies to devices, such as smart lights, that can change color.",
  },

  "action.devices.traits.Dock": {
    name: "Dock",
    states: [["isDocked", "boolean"]],
    attributes: {},
    description:
      "This trait is designed for self-mobile devices that can be commanded to return for charging. By and large, these are currently robotic vacuum cleaners, but this would also apply to some drones, delivery robots, and other future devices.",
  },

  "action.devices.traits.FanSpeed": {
    name: "Fan Speed",
    states: [
      ["currentFanSpeedPercent", "number"],
      ["reverse", "boolean"],
      ["on", "boolean"],
    ],
    attributes: { supportsFanSpeedPercent: true, reversible: true },
    description:
      "This trait belongs to devices that support setting the speed of a fan. Fan speeds (that is, blowing air from the device at various levels, which may be part of an air conditioning or heating unit, or in a car).",
  },

  "action.devices.traits.Volume": {
    name: "Volume",
    states: [
      ["currentVolume", "number"],
      ["isMuted", "boolean"],
    ],
    attributes: { volumeMaxLevel: 100, volumeCanMuteAndUnmute: true },
    description:
      "This trait belongs to devices which are able to change volume (for example, setting the volume to a certain level, mute, or unmute).",
  },
} as const;

export type DeviceTraits = keyof typeof deviceTraits;

export type DeviceTraitStates<Trait extends DeviceTraits> =
  typeof deviceTraits[Trait]["states"][number][0];
