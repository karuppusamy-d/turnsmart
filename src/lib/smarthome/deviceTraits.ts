// export const deviceTraits = [
//   {
//     name: "AppSelector",
//     value: "action.devices.traits.AppSelector",
//     description:
//       "This trait belongs to devices that support media applications, typically from third parties.",
//   },
//   {
//     name: "ArmDisarm",
//     value: "action.devices.traits.ArmDisarm",
//     description:
//       "This trait supports arming and disarming as used in, for example, security systems.",
//   },
//   {
//     name: "Brightness",
//     value: "action.devices.traits.Brightness",
//     description:
//       "Absolute brightness setting is in a normalized range from 0 to 100 (individual lights may not support every point in the range based on their LED configuration).",
//   },
//   {
//     name: "CameraStream",
//     value: "action.devices.traits.CameraStream",
//     description:
//       "This trait belongs to devices which have the capability to stream video feeds to third party screens, Chromecast-connected screens, or smartphones. By and large, these are security cameras or baby cameras. But this trait also applies to more complex devices which have a camera on them (for example, video-conferencing devices or a vacuum robot with a camera on it).",
//   },
//   {
//     name: "Channel",
//     value: "action.devices.traits.Channel",
//     description:
//       "This trait belongs to devices that support TV channels on a media device.",
//   },
//   {
//     name: "ColorSetting",
//     value: "action.devices.traits.ColorSetting",
//     description:
//       "This trait applies to devices, such as smart lights, that can change color or color temperature.",
//   },
//   {
//     name: "Cook",
//     value: "action.devices.traits.Cook",
//     description:
//       "This trait belongs to devices that can cook food according to various food presets and supported cooking modes.",
//   },
//   {
//     name: "Dispense",
//     value: "action.devices.traits.Dispense",
//     description:
//       "This trait belongs to devices that support dispensing a specified amount of one or more physical items. For example, a dog treat dispenser may dispense a number of treats, a faucet may dispense cups of water, and a pet feeder may dispense both water and pet food.",
//   },
//   {
//     name: "Dock",
//     value: "action.devices.traits.Dock",
//     description:
//       "This trait is designed for self-mobile devices that can be commanded to return for charging.",
//   },
//   {
//     name: "EnergyStorage",
//     value: "action.devices.traits.EnergyStorage",
//     description:
//       "This trait belongs to devices that can store energy in a battery and potentially recharge, or devices that can charge another device. The trait supports starting and stopping charging, and checking the current charge level, capacity remaining, and capacity until full values.",
//   },
//   {
//     name: "FanSpeed",
//     value: "action.devices.traits.FanSpeed",
//     description:
//       "This trait belongs to devices that support setting the speed of a fan (that is, blowing air from the device at various levels, which may be part of an air conditioning or heating unit, or in a car), with settings such as low, medium, and high.",
//   },
//   {
//     name: "Fill",
//     value: "action.devices.traits.Fill",
//     description:
//       "This trait applies to devices that support being filled, such as a bathtub.",
//   },
//   {
//     name: "HumiditySetting",
//     value: "action.devices.traits.HumiditySetting",
//     description:
//       "This trait belongs to devices that support humidity settings such as humidifiers and dehumidifiers.",
//   },
//   {
//     name: "InputSelector",
//     value: "action.devices.traits.InputSelector",
//     description:
//       "Trait for devices that can change media inputs. These inputs can have dynamic names per device, and may represent audio or video feeds, hardwired or networked.",
//   },
//   {
//     name: "LightEffects",
//     value: "action.devices.traits.LightEffects",
//     description:
//       "This trait belongs to devices that can support complex lighting commands to change state, such as looping through various colors.",
//   },
//   {
//     name: "Locator",
//     value: "action.devices.traits.Locator",
//     description:
//       'This trait is used for devices that can be "found". This includes phones, robots (including vacuums and mowers), drones, and tag-specific products that attach to other devices.',
//   },
//   {
//     name: "LockUnlock",
//     value: "action.devices.traits.LockUnlock",
//     description:
//       "This trait belongs to any devices that support locking and unlocking, and/or reporting a locked state.",
//   },
//   {
//     name: "MediaState",
//     value: "action.devices.traits.MediaState",
//     description:
//       "This trait is used for devices which are able to report media states.",
//   },
//   {
//     name: "Modes",
//     value: "action.devices.traits.Modes",
//     description:
//       'This trait belongs to any devices with an arbitrary number of "n-way" modes in which the modes and settings for each mode are arbitrary and unique to each device or device type. Each mode has multiple possible settings, but only one can be selected at a time; a dryer cannot be in "delicate," "normal," and "heavy duty" mode simultaneously. A setting that simply can be turned on or off belongs in the Toggles trait.',
//   },
//   {
//     name: "NetworkControl",
//     value: "action.devices.traits.NetworkControl",
//     description:
//       "This trait belongs to devices that support reporting network data and performing network specific operations.",
//   },
//   {
//     name: "ObjectDetection",
//     value: "action.devices.traits.ObjectDetection",
//     description:
//       "This trait belongs to devices that can detect objects or people and send a notification to the user. For example, it can be used for doorbells to indicate that a person (named or unnamed) rang the doorbell, as well as for cameras and sensors that can detect movement of objects or people approaching.",
//   },
//   {
//     name: "OnOff",
//     value: "action.devices.traits.OnOff",
//     description:
//       "The basic on and off functionality for any device that has binary on and off, including plugs and switches as well as many future devices.",
//   },
//   {
//     name: "OpenClose",
//     value: "action.devices.traits.OpenClose",
//     description:
//       "This trait belongs to devices that support opening and closing, and in some cases opening and closing partially or potentially in more than one direction. For example, some blinds may open either to the left or to the right. In some cases, opening certain devices may be a security sensitive action which can require two-factor authentication authentication. See Two-factor authentication.",
//   },
//   {
//     name: "Reboot",
//     value: "action.devices.traits.Reboot",
//     description:
//       "This trait belongs to devices that support rebooting, such as routers. The device needs to support rebooting as a single action.",
//   },
//   {
//     name: "Rotation",
//     value: "action.devices.traits.Rotation",
//     description:
//       "This trait belongs to devices that support rotation, such as blinds with rotatable slats.",
//   },
//   {
//     name: "RunCycle",
//     value: "action.devices.traits.RunCycle",
//     description:
//       "This trait represents any device that has an ongoing duration for its operation which can be queried. This includes, but is not limited to, devices that operate cyclically, such as washing machines, dryers, and dishwashers.",
//   },
//   {
//     name: "SensorState",
//     value: "action.devices.traits.SensorState",
//     description:
//       "This trait covers both quantitative measurement (for example, air quality index or smoke level) and qualitative state (for example, whether the air quality is healthy or whether the smoke level is low or high).",
//   },
//   {
//     name: "Scene",
//     value: "action.devices.traits.Scene",
//     description:
//       "In the case of scenes, the type maps 1:1 to the trait, as scenes don't combine with other traits to form composite devices.",
//   },
//   {
//     name: "SoftwareUpdate",
//     value: "action.devices.traits.SoftwareUpdate",
//     description:
//       "This trait belongs to devices that support software updates such as a router. Optionally, these devices may report the time of the last successful update.",
//   },
//   {
//     name: "StartStop",
//     value: "action.devices.traits.StartStop",
//     description:
//       "Starting and stopping a device serves a similar function to turning it on and off. Devices that inherit this trait function differently when turned on and when started. Unlike devices that simply have an on and off state, some devices that can start and stop are also able to pause while performing operation.",
//   },
//   {
//     name: "StatusReport",
//     value: "action.devices.traits.StatusReport",
//     description:
//       "This trait reports the current status or state of a specific device or a connected group of devices.",
//   },
//   {
//     name: "TemperatureControl",
//     value: "action.devices.traits.TemperatureControl",
//     description:
//       "Trait for devices (other than thermostats) that support controlling temperature, either within or around the device. This includes devices such as ovens and refrigerators.",
//   },
//   {
//     name: "TemperatureSetting",
//     value: "action.devices.traits.TemperatureSetting",
//     description: "This trait covers handling both temperature point and modes.",
//   },
//   {
//     name: "Timer",
//     value: "action.devices.traits.Timer",
//     description:
//       "The Timer trait represents a timer on a device, primarily kitchen appliances such as ovens and microwaves, but not limited to them.",
//   },
//   {
//     name: "Toggles",
//     value: "action.devices.traits.Toggles",
//     description:
//       "This trait belongs to any devices with settings that can only exist in one of two states. These settings can represent a physical button with an on/off or active/inactive state, a checkbox in HTML, or any other sort of specifically enabled/disabled element.",
//   },
//   {
//     name: "TransportControl",
//     value: "action.devices.traits.TransportControl",
//     description:
//       "This trait supports media devices which are able to control media playback (for example, resuming music that's paused).",
//   },
//   {
//     name: "Volume",
//     value: "action.devices.traits.Volume",
//     description:
//       "This trait belongs to devices which are able to change volume (for example, setting the volume to a certain level, mute, or unmute).",
//   },
// ] as const;

export const deviceTraits = [
  {
    name: "OnOff",
    value: "action.devices.traits.OnOff",
    states: [{ on: "boolean" }],
    commends: [{ "action.devices.commands.OnOff": { on: "boolean" } }],
    description:
      "The basic on and off functionality for any device that has binary on and off, including plugs and switches as well as many future devices.",
  },
  {
    name: "StartStop",
    value: "action.devices.traits.StartStop",
    states: [{ isRunning: "boolean" }, { isPaused: "boolean" }],
    commends: [
      { "action.devices.commands.StartStop": { start: "boolean" } },
      // { "action.devices.commands.PauseUnpause": { pause: "boolean" } },
    ],
    description:
      "Starting and stopping a device serves a similar function to turning it on and off. Devices that inherit this trait function differently when turned on and when started. Unlike devices that simply have an on and off state, some devices that can start and stop are also able to pause while performing operation.",
  },
  {
    name: "Brightness",
    value: "action.devices.traits.Brightness",
    states: [{ brightness: "integer", on: "boolean" }],
    commends: [
      {
        "action.devices.commands.BrightnessAbsolute": { brightness: "integer" },
      },
      // {
      //   "action.devices.commands.BrightnessRelative": {
      //     brightnessRelativePercent: "integer",
      //     brightnessRelativeWeight: "integer",
      //   },
      // },
    ],
    description:
      "Absolute brightness setting is in a normalized range from 0 to 100 (individual lights may not support every point in the range based on their LED configuration).",
  },
] as const;

export const deviceTraitsObj = {
  "action.devices.traits.OnOff": {
    states: [["on", "boolean"]],
  },

  "action.devices.traits.StartStop": {
    states: [["isRunning", "boolean"]],
  },

  "action.devices.traits.Brightness": {
    states: [
      ["brightness", "integer"],
      ["on", "boolean"], // Need to decide if this is needed
    ],
  },
} as const;

export const deviceCommands = {
  // action.devices.traits.OnOff
  "action.devices.commands.OnOff": {
    trait: "action.devices.traits.OnOff",
    on: (value: boolean) => {
      return { on: value };
    },
  },

  // action.devices.traits.StartStop
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

  // action.devices.traits.Brightness
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
} as const;

export type DeviceTraits = typeof deviceTraits[number]["value"];

export type DeviceCommands = keyof typeof deviceCommands;

export type DeviceTraitStates<Trait extends DeviceTraits> =
  typeof deviceTraitsObj[Trait]["states"][number][0];
