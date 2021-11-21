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
    states: [["spectrumRGB", "color", "color"]],
    attributes: { colorModel: "rgb" },
    description:
      "This trait applies to devices, such as smart lights, that can change color.",
  },
} as const;

export type DeviceTraits = keyof typeof deviceTraits;

export type DeviceTraitStates<Trait extends DeviceTraits> =
  typeof deviceTraits[Trait]["states"][number][0];
