// export const deviceTypes = [
//   {
//     name: "AC_UNIT",
//     value: "action.devices.types.AC_UNIT",
//     description:
//       "Air conditioning units are similar to thermostats, but do not support heating and may not support setting temperature targets.",
//     required: ["FanSpeed", "OnOff", "TemperatureSetting"],
//   },
//   {
//     name: "AIRCOOLER",
//     value: "action.devices.types.AIRCOOLER",
//     description:
//       "Air coolers are devices that allow temperature cooling and humidity control. These devices are typically more lightweight and portable than air conditioners, and have a water tank attached. Air coolers may not support heating or setting exact temperatures. Interactions with air coolers may include changing the fan speed and humidity setting.",
//     required: ["FanSpeed", "HumiditySetting", "OnOff", "TemperatureSetting"],
//   },
//   {
//     name: "AIRFRESHENER",
//     value: "action.devices.types.AIRFRESHENER",
//     description:
//       "Air fresheners can be turned on and off and may allow adjusting various modes.",
//     required: ["Modes", "Toggles", "OnOff"],
//   },
//   {
//     name: "AIRPURIFIER",
//     value: "action.devices.types.AIRPURIFIER",
//     description:
//       "Air purifiers are devices that may be turned on and off, report air filter cleanliness and air filter lifetime, and be adjusted to various mode settings.",
//     required: ["FanSpeed", "SensorState", "OnOff"],
//   },
//   {
//     name: "AUDIO_VIDEO_RECEIVER",
//     value: "action.devices.types.AUDIO_VIDEO_RECEIVER",
//     description:
//       "Device that takes audio input (for example, HDMI, optical, and RCA) and outputs sound to one or more speakers.",
//     required: [
//       "AppSelector",
//       "InputSelector",
//       "MediaState",
//       "OnOff",
//       "TransportControl",
//       "Volume",
//     ],
//   },
//   {
//     name: "AWNING",
//     value: "action.devices.types.AWNING",
//     description:
//       "Awnings are retractable and can opened and closed. They can be installed indoors or outdoors.",
//     required: ["OpenClose"],
//   },
//   {
//     name: "BATHTUB",
//     value: "action.devices.types.BATHTUB",
//     description:
//       "Bathtubs can be filled and drained, possibly to particular levels if the bathtub supports it.",
//     required: ["Fill", "TemperatureControl", "StartStop"],
//   },
//   {
//     name: "BED",
//     value: "action.devices.types.BED",
//     description:
//       "Interactions with beds may include adjusting various modes and setting scenes.",
//     required: ["Scene", "Modes"],
//   },
//   {
//     name: "BLENDER",
//     value: "action.devices.types.BLENDER",
//     description:
//       "Interactions with blenders may include starting and stopping, setting a timer, setting cooking modes or food presets, or adjusting other various settings.",
//     required: ["Cook", "StartStop", "Timer", "OnOff"],
//   },
//   {
//     name: "BLINDS",
//     value: "action.devices.types.BLINDS",
//     description:
//       "Blinds can be opened and closed, and various types of blinds are supported such as venetian (opens in one direction), panel or vertical (may open either left or right), and top-down bottom-up (may open either up or down). Some blinds may have slats that can be rotated.",
//     required: ["Rotation", "OpenClose"],
//   },
//   {
//     name: "BOILER",
//     value: "action.devices.types.BOILER",
//     description:
//       "Boilers can be turned on and off, and may support adjusting temperature.",
//     required: ["TemperatureControl", "OnOff"],
//   },
//   {
//     name: "CAMERA",
//     value: "action.devices.types.CAMERA",
//     description:
//       "Cameras are complex and features will vary significantly between vendors. Over time, cameras will acquire many traits and attributes describing specific capabilities, many of which may interact with the video/audio stream in special ways, such as sending a stream to another device, identifying what's in the stream, replaying feeds, etc.",
//     required: ["CameraStream"],
//   },
//   {
//     name: "CARBON_MONOXIDE_DETECTOR",
//     value: "action.devices.types.CARBON_MONOXIDE_DETECTOR",
//     description:
//       "Carbon monoxide detectors may report whether carbon monoxide is currently detected, whether the carbon monoxide level is high, and the current carbon monoxide level in parts per million.",
//     required: ["SensorState"],
//   },
//   {
//     name: "CHARGER",
//     value: "action.devices.types.CHARGER",
//     description:
//       "Interactions with chargers may include starting and stopping charging, and checking the current charge level, capacity remaining, and capacity until full values.",
//     required: ["EnergyStorage"],
//   },
//   {
//     name: "CLOSET",
//     value: "action.devices.types.CLOSET",
//     description:
//       "Closets can be opened and closed, potentially in more than one direction.",
//     required: ["OpenClose"],
//   },
//   {
//     name: "COFFEE_MAKER",
//     value: "action.devices.types.COFFEE_MAKER",
//     description:
//       "Interactions with coffee makers may include turning them on and off, adjusting cooking modes and food presets, adjusting the target temperature, and adjusting various non-cooking mode settings.",
//     required: ["Cook", "TemperatureControl", "OnOff"],
//   },
//   {
//     name: "COOKTOP",
//     value: "action.devices.types.COOKTOP",
//     description:
//       "Interactions with cooktops may include turning them on and off, starting and stopping, setting a timer, adjusting cooking modes and food presets, and adjusting various non-cooking mode settings.",
//     required: ["Cook", "Timer", "OnOff"],
//   },
//   {
//     name: "CURTAIN",
//     value: "action.devices.types.CURTAIN",
//     description:
//       "Curtains can be opened and closed, potentially in more than one direction. For example, curtains with two sections may open either to the left or to the right.",
//     required: ["OpenClose"],
//   },
//   {
//     name: "DEHUMIDIFIER",
//     value: "action.devices.types.DEHUMIDIFIER",
//     description:
//       "Dehumidifiers are devices that remove moisture from the air. They can be turned on and off, report and adjust target humidity, and may have various adjustables modes or fan speed settings.",
//     required: ["FanSpeed", "HumiditySetting", "StartStop", "OnOff"],
//   },
//   {
//     name: "DEHYDRATOR",
//     value: "action.devices.types.DEHYDRATOR",
//     description:
//       "Interactions with dehydrators may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.",
//     required: ["Cook", "StartStop", "Timer", "OnOff"],
//   },
//   {
//     name: "DISHWASHER",
//     value: "action.devices.types.DISHWASHER",
//     description:
//       "Dishwashers can have start and stop functionality independent from being on or off (some washers have separate power buttons, and some do not). Some can be paused and resumed while washing. Dishwashers also have various modes and each mode has its own related settings. These are specific to the dishwasher and are interpreted in a generalized form.",
//     required: ["OnOff", "RunCycle", "StartStop"],
//   },
//   {
//     name: "DOOR",
//     value: "action.devices.types.DOOR",
//     description:
//       "Door can be opened and closed, potentially in more than one direction.",
//     required: ["LockUnlock", "OpenClose"],
//   },
//   {
//     name: "DOORBELL",
//     value: "action.devices.types.DOORBELL",
//     description:
//       "Doorbells can let people know someone is at the door. This device can send notifications and stream video if it has the corresponding capability.",
//     required: ["ObjectDetection", "CameraStream"],
//   },
//   {
//     name: "DRAWER",
//     value: "action.devices.types.DRAWER",
//     description:
//       "Drawers can be opened and closed, potentially in more than one direction.",
//     required: ["OpenClose"],
//   },
//   {
//     name: "DRYER",
//     value: "action.devices.types.DRYER",
//     description:
//       "Dryers have start and stop functionality independent from being on or off. Some can be paused and resumed while drying. Dryers also have various modes and each mode has its own related settings. These are specific to the dryer and are interpreted in a generalized form.",
//     required: ["Modes", "OnOff", "RunCycle", "Toggles", "StartStop"],
//   },
//   {
//     name: "FAN",
//     value: "action.devices.types.FAN",
//     description:
//       "Fans can typically be turned on and off and have speed settings. Some fans may also have additional supported modes, such as fan direction/orientation (for example, a wall unit may have settings to adjust whether it blows up or down).",
//     required: ["FanSpeed", "OnOff"],
//   },
//   {
//     name: "FAUCET",
//     value: "action.devices.types.FAUCET",
//     description:
//       "Faucets can dispense liquids in various quantities and presets. Faucets may have various modes and each mode has its own related settings. These are specific to the faucet and are interpreted in a generalized form.",
//     required: ["Dispense", "StartStop", "TemperatureControl"],
//   },
//   {
//     name: "FIREPLACE",
//     value: "action.devices.types.FIREPLACE",
//     description:
//       "Fireplaces can be turned on and off, and may have adjustable modes.",
//     required: ["Modes", "Toggles", "OnOff"],
//   },
//   {
//     name: "FREEZER",
//     value: "action.devices.types.FREEZER",
//     description:
//       "Freezers are temperature-managing devices which may be adjusted to various mode settings, and may allow temperature monitoring.",
//     required: ["TemperatureControl"],
//   },
//   {
//     name: "FRYER",
//     value: "action.devices.types.FRYER",
//     description:
//       "Interactions with fryers may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.",
//     required: ["Cook", "StartStop", "Timer", "OnOff"],
//   },
//   {
//     name: "GARAGE",
//     value: "action.devices.types.GARAGE",
//     description:
//       "Garage doors can open, close, and detect an open state. They can also indicate if an object has obstructed the path of the door while closing or if the door is locked and therefore cannot be controlled.",
//     required: ["LockUnlock", "OpenClose"],
//   },
//   {
//     name: "GATE",
//     value: "action.devices.types.GATE",
//     description:
//       "Gates can be opened and closed, potentially in more than on direction.",
//     required: ["LockUnlock", "OpenClose"],
//   },
//   {
//     name: "GRILL",
//     value: "action.devices.types.GRILL",
//     description:
//       "Interactions with grills may include turning them on and off, starting and stopping, setting a timer, adjusting cooking modes and food presets, and adjusting various non-cooking mode settings.",
//     required: ["Cook", "OnOff", "Timer", "StartStop"],
//   },
//   {
//     name: "HEATER",
//     value: "action.devices.types.HEATER",
//     description:
//       "Heaters are similar to thermostats but do not support cooling and may not support setting temperature targets.",
//     required: ["FanSpeed", "TemperatureSetting"],
//   },
//   {
//     name: "HOOD",
//     value: "action.devices.types.HOOD",
//     description:
//       "Oven and range hoods can be turned on and off, may have adjustable modes, and may have adjustable fan speeds.",
//     required: ["Brightness", "FanSpeed", "OnOff"],
//   },
//   {
//     name: "HUMIDIFIER",
//     value: "action.devices.types.HUMIDIFIER",
//     description:
//       "Humidifiers are devices that add moisture to the air. They can be turned on and off, report and adjust target humidity, and may have various adjustable modes or fan speed settings.",
//     required: ["FanSpeed", "HumiditySetting", "StartStop", "OnOff"],
//   },
//   {
//     name: "KETTLE",
//     value: "action.devices.types.KETTLE",
//     description:
//       "Kettles are devices that boil water. Interactions with kettles may include turning them on and off, adjusting the target temperature, and perhaps adjusting various mode settings.",
//     required: ["TemperatureControl", "OnOff"],
//   },
//   {
//     name: "LIGHT",
//     value: "action.devices.types.LIGHT",
//     description:
//       "Light devices can be turned on and off. They may have additional features, such as dimming and the ability to change color.",
//     required: ["ColorSetting", "Brightness", "OnOff"],
//   },
//   {
//     name: "LOCK",
//     value: "action.devices.types.LOCK",
//     description: "Locks can lock, unlock, and report a locked state.",
//     required: ["LockUnlock"],
//   },
//   {
//     name: "MICROWAVE",
//     value: "action.devices.types.MICROWAVE",
//     description:
//       "Interactions with microwaves may include starting and stopping, setting a timer, adjusting cooking modes and food presets, and adjusting non-cooking modes.",
//     required: ["Cook", "Timer", "StartStop"],
//   },
//   {
//     name: "MOP",
//     value: "action.devices.types.MOP",
//     description:
//       "Interactions with mops may include starting, stopping, pausing cleaning, docking, checking the current cleaning cycle, locating the mop, or adjusting various modes. Some mops may support cleaning specific zones in the home.",
//     required: [
//       "Dock",
//       "EnergyStorage",
//       "Locator",
//       "OnOff",
//       "RunCycle",
//       "StartStop",
//     ],
//   },
//   {
//     name: "MOWER",
//     value: "action.devices.types.MOWER",
//     description:
//       "Interactions with mowers may include starting, stopping and pausing mowing, docking, checking the current cycle, locating the mower, and adjusting various modes.",
//     required: [
//       "Dock",
//       "EnergyStorage",
//       "Locator",
//       "OnOff",
//       "RunCycle",
//       "StartStop",
//     ],
//   },
//   {
//     name: "MULTICOOKER",
//     value: "action.devices.types.MULTICOOKER",
//     description:
//       "Interactions with multicookers may include starting and stopping, setting a timer, or and adjusting non-cooking modes.",
//     required: ["Cook", "StartStop", "Timer", "OnOff"],
//   },
//   {
//     name: "NETWORK",
//     value: "action.devices.types.NETWORK",
//     description:
//       "Represents a group of router nodes or a mesh network controlled as one entity rather than as individual devices. The network device may reboot, update its software, and have modes to handle Quality of Service (QoS) controls and parental restrictions. The device can perform operations such as enabling the guest network, and reporting network-specific information such as the current internet throughput rates.",
//     required: ["Reboot", "SoftwareUpdate", "NetworkControl"],
//   },
//   {
//     name: "OUTLET",
//     value: "action.devices.types.OUTLET",
//     description:
//       "Outlet, a basic device in Smart Home, has binary modes on/off only.",
//     required: ["OnOff"],
//   },
//   {
//     name: "OVEN",
//     value: "action.devices.types.OVEN",
//     description:
//       "Interaction with ovens involves the ability to bake or broil at certain temperatures. The physical temperature inside the oven differs as the oven is heating, so this may also be monitored. The oven has a cook time that limits the duration of baking.",
//     required: ["Cook", "TemperatureControl", "Timer", "OnOff"],
//   },
//   {
//     name: "PERGOLA",
//     value: "action.devices.types.PERGOLA",
//     description:
//       "Pergolas (an outdoor garden structure) can be opened and closed, potentially in more than one direction. For example, some pergolas with a canvas may open either to the LEFT or RIGHT.",
//     required: ["Rotation", "OpenClose"],
//   },
//   {
//     name: "PETFEEDER",
//     value: "action.devices.types.PETFEEDER",
//     description:
//       "Interactions with pet feeders may include dispensing pet food or water in various quantities and presets.",
//     required: ["OnOff", "StartStop", "Dispense"],
//   },
//   {
//     name: "PRESSURECOOKER",
//     value: "action.devices.types.PRESSURECOOKER",
//     description:
//       "Interactions with pressure cookers may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.",
//     required: ["Cook", "Timer", "OnOff"],
//   },
//   {
//     name: "RADIATOR",
//     value: "action.devices.types.RADIATOR",
//     description:
//       "Radiators can be turned on and off and may allow adjusting various modes.",
//     required: ["Modes", "Toggles", "OnOff"],
//   },
//   {
//     name: "REFRIGERATOR",
//     value: "action.devices.types.REFRIGERATOR",
//     description:
//       "Refrigerators are temperature-managing devices which may have various modes/settings.",
//     required: ["TemperatureControl"],
//   },
//   {
//     name: "REMOTECONTROL",
//     value: "action.devices.types.REMOTECONTROL",
//     description:
//       "Media remotes are used to control media devices. Examples of this device type include hubs, universal remotes, and media controllers.",
//     required: [
//       "AppSelector",
//       "Channel",
//       "InputSelector",
//       "MediaState",
//       "OnOff",
//       "TransportControl",
//       "Volume",
//     ],
//   },
//   {
//     name: "ROUTER",
//     value: "action.devices.types.ROUTER",
//     description:
//       "Routers can reboot, update their software, have modes to handle Quality of Service (QoS) controls and parental restrictions, and perform network specific operations (such as enabling the guest network and reporting network specific information such as the current internet throughput rates).",
//     required: ["Reboot", "SoftwareUpdate", "NetworkControl"],
//   },
//   {
//     name: "SCENE",
//     value: "action.devices.types.SCENE",
//     description:
//       "In the case of scenes, the type maps 1:1 to the trait, as scenes don't combine with other traits to form composite devices. Scenes should always have user-provided names. Each scene is its own virtual device, with its own name(s).",
//     required: ["Scene"],
//   },
//   {
//     name: "SECURITYSYSTEM",
//     value: "action.devices.types.SECURITYSYSTEM",
//     description:
//       "Security systems can be armed and disarmed. They can be armed at multiple security levels (for example, home and away) and they can report information about certain sensors, such as a sensor that detects motion or an open window.",
//     required: ["StatusReport", "ArmDisarm"],
//   },
//   {
//     name: "SENSOR",
//     value: "action.devices.types.SENSOR",
//     description:
//       "A single sensor can serve multiple functions, such as monitoring both temperature and humidity. Sensors may report either or both quantitative—for example, carbon monoxide and smoke level measured at parts per million—and qualitative measurements (such as whether air quality is healthy or unhealthy).",
//     required: ["SensorState", "EnergyStorage"],
//   },
//   {
//     name: "SETTOP",
//     value: "action.devices.types.SETTOP",
//     description:
//       "Interactions with Multichannel Video Programming Distributor (MVPD) and set-top-box devices may include controlling media playback.",
//     required: [
//       "Volume",
//       "AppSelector",
//       "MediaState",
//       "Channel",
//       "OnOff",
//       "TransportControl",
//     ],
//   },
//   {
//     name: "SHOWER",
//     value: "action.devices.types.SHOWER",
//     description:
//       "Showers can be turned on and off and may support adjusting temperature.",
//     required: ["StartStop", "TemperatureControl"],
//   },
//   {
//     name: "SHUTTER",
//     value: "action.devices.types.SHUTTER",
//     description:
//       "Shutters can be opened and closed, potentially in more than one direction. Some shutters may have slats that can be rotated.",
//     required: ["Rotation", "OpenClose"],
//   },
//   {
//     name: "SMOKE_DETECTOR",
//     value: "action.devices.types.SMOKE_DETECTOR",
//     description:
//       "Smoke detectors can report whether smoke is currently detected, whether the smoke level is high, and the current smoke level in parts per million.",
//     required: ["SensorState"],
//   },
//   {
//     name: "SOUNDBAR",
//     value: "action.devices.types.SOUNDBAR",
//     description:
//       "An all-in-one audio device that is often used in conjunction with a TV and has a bar form factor.",
//     required: [
//       "AppSelector",
//       "InputSelector",
//       "MediaState",
//       "OnOff",
//       "TransportControl",
//       "Volume",
//     ],
//   },
//   {
//     name: "SOUSVIDE",
//     value: "action.devices.types.SOUSVIDE",
//     description:
//       "Interactions with sous vides may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.",
//     required: ["Cook", "StartStop", "Timer", "OnOff"],
//   },
//   {
//     name: "SPEAKER",
//     value: "action.devices.types.SPEAKER",
//     description:
//       "This device is a connected speaker that does not split audio into separate channels (for example, between two left and right devices).",
//     required: [
//       "AppSelector",
//       "InputSelector",
//       "MediaState",
//       "OnOff",
//       "TransportControl",
//       "Volume",
//     ],
//   },
//   {
//     name: "SPRINKLER",
//     value: "action.devices.types.SPRINKLER",
//     description:
//       "Sprinklers can start and stop (or turn on and off). They may also support timers and/or schedules.",
//     required: ["Timer", "StartStop"],
//   },
//   {
//     name: "STANDMIXER",
//     value: "action.devices.types.STANDMIXER",
//     description:
//       "Interactions with stand mixers may include turning mixers on and off, starting and stopping the mixer, adjusting cooking modes or food presets, or adjusting various non-cooking mode settings.",
//     required: ["Cook", "StartStop", "OnOff"],
//   },
//   {
//     name: "STREAMING_BOX",
//     value: "action.devices.types.STREAMING_BOX",
//     description:
//       "This device enables streaming services for media and music, often used in conjunction with a display such as a TV. This devices is powered from a constant source, separate from the display device itself.",
//     required: [
//       "Channel",
//       "InputSelector",
//       "AppSelector",
//       "MediaState",
//       "OnOff",
//       "TransportControl",
//       "Volume",
//     ],
//   },
//   {
//     name: "STREAMING_SOUNDBAR",
//     value: "action.devices.types.STREAMING_SOUNDBAR",
//     description:
//       "This device is a combination of speaker and streaming stick or box. This device provides a streaming experience in addition to soundbar capabilities.",
//     required: [
//       "InputSelector",
//       "AppSelector",
//       "MediaState",
//       "OnOff",
//       "TransportControl",
//       "Volume",
//     ],
//   },
//   {
//     name: "STREAMING_STICK",
//     value: "action.devices.types.STREAMING_STICK",
//     description:
//       "This device has a small stick-like form factor that is usually powered by a USB or HDMI cable connected to a display such as a TV.",
//     required: [
//       "OnOff",
//       "AppSelector",
//       "MediaState",
//       "TransportControl",
//       "Volume",
//     ],
//   },
//   {
//     name: "SWITCH",
//     value: "action.devices.types.SWITCH",
//     description:
//       "Switch, a basic device in Smart Home, can be turned on and off.",
//     required: ["Brightness", "OnOff"],
//   },
//   {
//     name: "THERMOSTAT",
//     value: "action.devices.types.THERMOSTAT",
//     description:
//       "Thermostats are temperature-managing devices, with set points and modes. This separates them from heaters and AC units which may only have modes and settings (for example, high/low) vs a temperature target.",
//     required: ["TemperatureSetting"],
//   },
//   {
//     name: "TV",
//     value: "action.devices.types.TV",
//     description:
//       "Television devices combine a tuner, display, and loudspeakers for the purpose of viewing and hearing media. Examples include smart TV devices.",
//     required: [
//       "Channel",
//       "AppSelector",
//       "InputSelector",
//       "MediaState",
//       "OnOff",
//       "TransportControl",
//       "Volume",
//     ],
//   },
//   {
//     name: "VACUUM",
//     value: "action.devices.types.VACUUM",
//     description:
//       "Vacuums may have functions such as starting, stopping, and pausing cleaning, docking, checking the current cleaning cycle, locating the vacuum, or adjusting various modes. Some vacuums may support cleaning specific zones in the home.",
//     required: [
//       "Dock",
//       "EnergyStorage",
//       "Locator",
//       "OnOff",
//       "RunCycle",
//       "StartStop",
//     ],
//   },
//   {
//     name: "VALVE",
//     value: "action.devices.types.VALVE",
//     description: "Valves can be opened and closed.",
//     required: ["OpenClose"],
//   },
//   {
//     name: "WASHER",
//     value: "action.devices.types.WASHER",
//     description:
//       "Washers can have start and stop functionality independent from being on or off (some washers have separate power buttons, and some do not). Some can be paused and resumed while washing. Washers also have various modes and each mode has its own related settings. These are specific to the washer and are interpreted in a generalized form.",
//     required: ["Modes", "OnOff", "RunCycle", "Toggles", "StartStop"],
//   },
//   {
//     name: "WATERHEATER",
//     value: "action.devices.types.WATERHEATER",
//     description:
//       "Water heaters are devices used to heat water. They may turn on and off and adjust water temperature.",
//     required: ["TemperatureControl", "OnOff"],
//   },
//   {
//     name: "WATERPURIFIER",
//     value: "action.devices.types.WATERPURIFIER",
//     description:
//       "Water purifiers are devices that may be turned on and off, report water filter cleanliness and filter lifetime, and be adjusted to various mode settings.",
//     required: ["OnOff", "SensorState"],
//   },
//   {
//     name: "WATERSOFTENER",
//     value: "action.devices.types.WATERSOFTENER",
//     description:
//       "Water softeners are devices that may be turned on and off, report water filter cleanliness and filter lifetime, and be adjusted to various mode settings.",
//     required: ["OnOff", "SensorState"],
//   },
//   {
//     name: "WINDOW",
//     value: "action.devices.types.WINDOW",
//     description:
//       "Windows can be opened and closed, optionally with sections that open in different directions, and may also be locked and unlocked.",
//     required: ["LockUnlock", "OpenClose"],
//   },
//   {
//     name: "YOGURTMAKER",
//     value: "action.devices.types.YOGURTMAKER",
//     description:
//       "Interactions with yogurt makers may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.",
//     required: ["Cook", "StartStop", "Timer", "OnOff"],
//   },
// ] as const;

export const deviceTypes = [
  {
    name: "AIRFRESHENER",
    value: "action.devices.types.AIRFRESHENER",
    description:
      "Air fresheners can be turned on and off and may allow adjusting various modes.",
    required: ["OnOff"],
    recomended: ["Modes", "Toggles"],
  },
  {
    name: "AIRPURIFIER",
    value: "action.devices.types.AIRPURIFIER",
    description:
      "Air purifiers are devices that may be turned on and off, report air filter cleanliness and air filter lifetime, and be adjusted to various mode settings.",
    required: ["OnOff"],
    recomended: ["FanSpeed", "SensorState"],
  },
  {
    name: "BLENDER",
    value: "action.devices.types.BLENDER",
    description:
      "Interactions with blenders may include starting and stopping, setting a timer, setting cooking modes or food presets, or adjusting other various settings.",
    required: ["OnOff"],
    recomended: ["Cook", "StartStop", "Timer"],
  },
  {
    name: "BOILER",
    value: "action.devices.types.BOILER",
    description:
      "Boilers can be turned on and off, and may support adjusting temperature.",
    required: ["OnOff"],
    recomended: ["TemperatureControl"],
  },
  {
    name: "COFFEE_MAKER",
    value: "action.devices.types.COFFEE_MAKER",
    description:
      "Interactions with coffee makers may include turning them on and off, adjusting cooking modes and food presets, adjusting the target temperature, and adjusting various non-cooking mode settings.",
    required: ["OnOff"],
    recomended: ["Cook", "TemperatureControl"],
  },
  {
    name: "COOKTOP",
    value: "action.devices.types.COOKTOP",
    description:
      "Interactions with cooktops may include turning them on and off, starting and stopping, setting a timer, adjusting cooking modes and food presets, and adjusting various non-cooking mode settings.",
    required: ["OnOff"],
    recomended: ["Cook", "Timer"],
  },
  {
    name: "DEHUMIDIFIER",
    value: "action.devices.types.DEHUMIDIFIER",
    description:
      "Dehumidifiers are devices that remove moisture from the air. They can be turned on and off, report and adjust target humidity, and may have various adjustables modes or fan speed settings.",
    required: ["OnOff"],
    recomended: ["FanSpeed", "HumiditySetting", "StartStop"],
  },
  {
    name: "DEHYDRATOR",
    value: "action.devices.types.DEHYDRATOR",
    description:
      "Interactions with dehydrators may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.",
    required: ["OnOff"],
    recomended: ["Cook", "StartStop", "Timer"],
  },
  {
    name: "DISHWASHER",
    value: "action.devices.types.DISHWASHER",
    description:
      "Dishwashers can have start and stop functionality independent from being on or off (some washers have separate power buttons, and some do not). Some can be paused and resumed while washing. Dishwashers also have various modes and each mode has its own related settings. These are specific to the dishwasher and are interpreted in a generalized form.",
    required: ["StartStop"],
    recomended: ["OnOff", "RunCycle"],
  },
  {
    name: "DRYER",
    value: "action.devices.types.DRYER",
    description:
      "Dryers have start and stop functionality independent from being on or off. Some can be paused and resumed while drying. Dryers also have various modes and each mode has its own related settings. These are specific to the dryer and are interpreted in a generalized form.",
    required: ["StartStop"],
    recomended: ["Modes", "OnOff", "RunCycle", "Toggles"],
  },
  {
    name: "FAUCET",
    value: "action.devices.types.FAUCET",
    description:
      "Faucets can dispense liquids in various quantities and presets. Faucets may have various modes and each mode has its own related settings. These are specific to the faucet and are interpreted in a generalized form.",
    required: [],
    recomended: ["Dispense", "StartStop", "TemperatureControl"],
  },
  {
    name: "FIREPLACE",
    value: "action.devices.types.FIREPLACE",
    description:
      "Fireplaces can be turned on and off, and may have adjustable modes.",
    required: [],
    recomended: ["Modes", "Toggles", "OnOff"],
  },
  {
    name: "FRYER",
    value: "action.devices.types.FRYER",
    description:
      "Interactions with fryers may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.",
    required: ["OnOff"],
    recomended: ["Cook", "StartStop", "Timer"],
  },
  {
    name: "LIGHT",
    value: "action.devices.types.LIGHT",
    description:
      "Light devices can be turned on and off. They may have additional features, such as dimming and the ability to change color.",
    required: ["OnOff"],
    recomended: ["ColorSetting", "Brightness"],
  },
  {
    name: "SWITCH",
    value: "action.devices.types.SWITCH",
    description:
      "Switch, a basic device in Smart Home, can be turned on and off.",
    required: ["Brightness", "OnOff"],
    recomended: ["Brightness"],
  },
  {
    name: "VALVE",
    value: "action.devices.types.VALVE",
    description: "Valves can be opened and closed.",
    required: ["OpenClose"],
    recomended: [],
  },
] as const;

export type DeviceTypes = typeof deviceTypes[number]["value"];
