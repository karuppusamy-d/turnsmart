export const deviceTypes = [
  {
    name: "Airfreshener",
    value: "action.devices.types.AIRFRESHENER",
    description:
      "Air fresheners can be turned on and off and may allow adjusting various modes.",
    required: ["OnOff"],
    recommended: ["Modes", "Toggles"],
  },
  {
    name: "Airpurifier",
    value: "action.devices.types.AIRPURIFIER",
    description:
      "Air purifiers are devices that may be turned on and off, report air filter cleanliness and air filter lifetime, and be adjusted to various mode settings.",
    required: ["OnOff"],
    recommended: ["FanSpeed", "SensorState"],
  },
  {
    name: "Bathtub",
    value: "action.devices.types.BATHTUB",
    description:
      "Bathtubs can be filled and drained, possibly to particular levels if the bathtub supports it.",
    required: [],
    recommended: ["Fill", "TemperatureControl", "StartStop"],
  },
  {
    name: "Blender",
    value: "action.devices.types.BLENDER",
    description:
      "Interactions with blenders may include starting and stopping, setting a timer, setting cooking modes or food presets, or adjusting other various settings.",
    required: ["OnOff"],
    recommended: ["Cook", "StartStop", "Timer"],
  },
  {
    name: "Boiler",
    value: "action.devices.types.BOILER",
    description:
      "Boilers can be turned on and off, and may support adjusting temperature.",
    required: ["OnOff"],
    recommended: ["TemperatureControl"],
  },
  {
    name: "Coffee Maker",
    value: "action.devices.types.COFFEE_MAKER",
    description:
      "Interactions with coffee makers may include turning them on and off, adjusting cooking modes and food presets, adjusting the target temperature, and adjusting various non-cooking mode settings.",
    required: ["OnOff"],
    recommended: ["Cook", "TemperatureControl"],
  },
  {
    name: "Cooktop",
    value: "action.devices.types.COOKTOP",
    description:
      "Interactions with cooktops may include turning them on and off, starting and stopping, setting a timer, adjusting cooking modes and food presets, and adjusting various non-cooking mode settings.",
    required: ["OnOff"],
    recommended: ["Cook", "Timer"],
  },
  {
    name: "Dehumidifier",
    value: "action.devices.types.DEHUMIDIFIER",
    description:
      "Dehumidifiers are devices that remove moisture from the air. They can be turned on and off, report and adjust target humidity, and may have various adjustables modes or fan speed settings.",
    required: ["OnOff"],
    recommended: ["FanSpeed", "HumiditySetting", "StartStop"],
  },
  {
    name: "Dehydrator",
    value: "action.devices.types.DEHYDRATOR",
    description:
      "Interactions with dehydrators may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.",
    required: ["OnOff"],
    recommended: ["Cook", "StartStop", "Timer"],
  },
  {
    name: "Dishwasher",
    value: "action.devices.types.DISHWASHER",
    description:
      "Dishwashers can have start and stop functionality independent from being on or off (some washers have separate power buttons, and some do not). Some can be paused and resumed while washing. Dishwashers also have various modes and each mode has its own related settings. These are specific to the dishwasher and are interpreted in a generalized form.",
    required: ["StartStop"],
    recommended: ["OnOff", "RunCycle"],
  },
  {
    name: "Dryer",
    value: "action.devices.types.DRYER",
    description:
      "Dryers have start and stop functionality independent from being on or off. Some can be paused and resumed while drying. Dryers also have various modes and each mode has its own related settings. These are specific to the dryer and are interpreted in a generalized form.",
    required: ["StartStop"],
    recommended: ["Modes", "OnOff", "RunCycle", "Toggles"],
  },
  {
    name: "Fan",
    value: "action.devices.types.FAN",
    description:
      "Fans can typically be turned on and off and have speed settings. Some fans may also have additional supported modes, such as fan direction/orientation (for example, a wall unit may have settings to adjust whether it blows up or down).",
    required: ["FanSpeed", "OnOff"],
    recommended: [],
  },
  {
    name: "Faucet",
    value: "action.devices.types.FAUCET",
    description:
      "Faucets can dispense liquids in various quantities and presets. Faucets may have various modes and each mode has its own related settings. These are specific to the faucet and are interpreted in a generalized form.",
    required: [],
    recommended: ["Dispense", "StartStop", "TemperatureControl"],
  },
  {
    name: "Fireplace",
    value: "action.devices.types.FIREPLACE",
    description:
      "Fireplaces can be turned on and off, and may have adjustable modes.",
    required: [],
    recommended: ["Modes", "Toggles", "OnOff"],
  },
  {
    name: "Fryer",
    value: "action.devices.types.FRYER",
    description:
      "Interactions with fryers may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.",
    required: ["OnOff"],
    recommended: ["Cook", "StartStop", "Timer"],
  },
  {
    name: "Grill",
    value: "action.devices.types.GRILL",
    description:
      "Interactions with grills may include turning them on and off, starting and stopping, setting a timer, adjusting cooking modes and food presets, and adjusting various non-cooking mode settings.",
    required: ["StartStop"],
    recommended: ["Cook", "OnOff", "Timer"],
  },
  {
    name: "Hood",
    value: "action.devices.types.HOOD",
    description:
      "Oven and range hoods can be turned on and off, may have adjustable modes, and may have adjustable fan speeds.",
    required: ["OnOff"],
    recommended: ["Brightness", "FanSpeed"],
  },
  {
    name: "Humidifier",
    value: "action.devices.types.HUMIDIFIER",
    description:
      "Humidifiers are devices that add moisture to the air. They can be turned on and off, report and adjust target humidity, and may have various adjustable modes or fan speed settings.",
    required: ["OnOff"],
    recommended: ["FanSpeed", "HumiditySetting", "StartStop"],
  },
  {
    name: "Kettle",
    value: "action.devices.types.KETTLE",
    description:
      "Kettles are devices that boil water. Interactions with kettles may include turning them on and off, adjusting the target temperature, and perhaps adjusting various mode settings.",
    required: ["OnOff"],
    recommended: ["TemperatureControl"],
  },
  {
    name: "Light",
    value: "action.devices.types.LIGHT",
    description:
      "Light devices can be turned on and off. They may have additional features, such as dimming and the ability to change color.",
    required: ["OnOff"],
    recommended: ["ColorSetting", "Brightness"],
  },
  {
    name: "Microwave",
    value: "action.devices.types.MICROWAVE",
    description:
      "Interactions with microwaves may include starting and stopping, setting a timer, adjusting cooking modes and food presets, and adjusting non-cooking modes.",
    required: ["StartStop"],
    recommended: ["Cook", "Timer"],
  },
  {
    name: "Mop",
    value: "action.devices.types.MOP",
    description:
      "Interactions with mops may include starting, stopping, pausing cleaning, docking, checking the current cleaning cycle, locating the mop, or adjusting various modes. Some mops may support cleaning specific zones in the home.",
    required: ["StartStop"],
    recommended: ["Dock", "EnergyStorage", "Locator", "OnOff", "RunCycle"],
  },
  {
    name: "Mower",
    value: "action.devices.types.MOWER",
    description:
      "Interactions with mowers may include starting, stopping and pausing mowing, docking, checking the current cycle, locating the mower, and adjusting various modes.",
    required: ["StartStop"],
    recommended: ["Dock", "EnergyStorage", "Locator", "OnOff", "RunCycle"],
  },
  {
    name: "Multicooker",
    value: "action.devices.types.MULTICOOKER",
    description:
      "Interactions with multicookers may include starting and stopping, setting a timer, or and adjusting non-cooking modes.",
    required: ["OnOff"],
    recommended: ["Cook", "StartStop", "Timer"],
  },
  {
    name: "Outlet",
    value: "action.devices.types.OUTLET",
    description:
      "Outlet, a basic device in Smart Home, has binary modes on/off only.",
    required: ["OnOff"],
    recommended: [],
  },
  {
    name: "Oven",
    value: "action.devices.types.OVEN",
    description:
      "Interaction with ovens involves the ability to bake or broil at certain temperatures. The physical temperature inside the oven differs as the oven is heating, so this may also be monitored. The oven has a cook time that limits the duration of baking.",
    required: ["OnOff"],
    recommended: ["Cook", "TemperatureControl", "Timer"],
  },
  {
    name: "Pressurecooker",
    value: "action.devices.types.PRESSURECOOKER",
    description:
      "Interactions with pressure cookers may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.",
    required: ["OnOff"],
    recommended: ["Cook", "Timer"],
  },
  {
    name: "Radiator",
    value: "action.devices.types.RADIATOR",
    description:
      "Radiators can be turned on and off and may allow adjusting various modes.",
    required: ["OnOff"],
    recommended: ["Modes", "Toggles"],
  },
  {
    name: "Sensor",
    value: "action.devices.types.SENSOR",
    description:
      "A single sensor can serve multiple functions, such as monitoring both temperature and humidity. Sensors may report either or both quantitative—for example, carbon monoxide and smoke level measured at parts per million—and qualitative measurements (such as whether air quality is healthy or unhealthy).",
    required: [],
    recommended: ["SensorState", "EnergyStorage"],
  },
  {
    name: "Shower",
    value: "action.devices.types.SHOWER",
    description:
      "Showers can be turned on and off and may support adjusting temperature.",
    required: [],
    recommended: ["StartStop", "TemperatureControl"],
  },
  {
    name: "Sousvide",
    value: "action.devices.types.SOUSVIDE",
    description:
      "Interactions with sous vides may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.",
    required: ["OnOff"],
    recommended: ["Cook", "StartStop", "Timer"],
  },
  {
    name: "Sprinkler",
    value: "action.devices.types.SPRINKLER",
    description:
      "Sprinklers can start and stop (or turn on and off). They may also support timers and/or schedules.",
    required: ["StartStop"],
    recommended: ["Timer"],
  },
  {
    name: "Standmixer",
    value: "action.devices.types.STANDMIXER",
    description:
      "Interactions with stand mixers may include turning mixers on and off, starting and stopping the mixer, adjusting cooking modes or food presets, or adjusting various non-cooking mode settings.",
    required: ["OnOff"],
    recommended: ["Cook", "StartStop"],
  },
  {
    name: "Switch",
    value: "action.devices.types.SWITCH",
    description:
      "Switch, a basic device in Smart Home, can be turned on and off.",
    required: ["OnOff"],
    recommended: ["Brightness"],
  },
  {
    name: "Vacuum",
    value: "action.devices.types.VACUUM",
    description:
      "Vacuums may have functions such as starting, stopping, and pausing cleaning, docking, checking the current cleaning cycle, locating the vacuum, or adjusting various modes. Some vacuums may support cleaning specific zones in the home.",
    required: ["StartStop"],
    recommended: ["Dock", "EnergyStorage", "Locator", "OnOff", "RunCycle"],
  },
  {
    name: "Washer",
    value: "action.devices.types.WASHER",
    description:
      "Washers can have start and stop functionality independent from being on or off (some washers have separate power buttons, and some do not). Some can be paused and resumed while washing. Washers also have various modes and each mode has its own related settings. These are specific to the washer and are interpreted in a generalized form.",
    required: ["StartStop"],
    recommended: ["Modes", "OnOff", "RunCycle", "Toggles"],
  },
  {
    name: "Waterheater",
    value: "action.devices.types.WATERHEATER",
    description:
      "Water heaters are devices used to heat water. They may turn on and off and adjust water temperature.",
    required: ["OnOff"],
    recommended: ["TemperatureControl"],
  },
  {
    name: "Waterpurifier",
    value: "action.devices.types.WATERPURIFIER",
    description:
      "Water purifiers are devices that may be turned on and off, report water filter cleanliness and filter lifetime, and be adjusted to various mode settings.",
    required: [],
    recommended: ["OnOff", "SensorState"],
  },
  {
    name: "Watersoftener",
    value: "action.devices.types.WATERSOFTENER",
    description:
      "Water softeners are devices that may be turned on and off, report water filter cleanliness and filter lifetime, and be adjusted to various mode settings.",
    required: [],
    recommended: ["OnOff", "SensorState"],
  },
  {
    name: "Yogurtmaker",
    value: "action.devices.types.YOGURTMAKER",
    description:
      "Interactions with yogurt makers may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.",
    required: ["OnOff"],
    recommended: ["Cook", "StartStop", "Timer"],
  },
] as const;

export type DeviceTypes = typeof deviceTypes[number]["value"];
