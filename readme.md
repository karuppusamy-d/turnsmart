# [turnsmart.io](https://io.karuppusamy.me)

It is a [open-source](https://github.com/karuppusamy-d/turnsmart) smart home development platform that allows you to build and deploy smart home devices in a matter of minutes. It supports a wide range of devices, including: ESP8266, ESP32, Arduino, Raspberry Pi, and more.

[Example projects](https://github.com/karuppusamy-d/turnsmart-examples.git)

## Features

- Easy to setup
- Google Home integration
- One-click Google Assistant integration
- Customizable traits
- Works with ESP32, ESP8266, and Raspberry Pi or other microcontrollers (e.g. Arduino)
- Secure API

## Quick Start Guide

1. Create a account with [turnsmart.io](https://io.karuppusamy.me).
2. Create a new project and add required [endpoints](#endpoints-section).
3. Enable smarthome in project settings and choose the [device type](#device-type).
4. Add required [traits](#device-traits) and update target endpoints for each trait.
5. Connect your smarthome device to the website using the [API](#api-reference).
6. Connect your device to Google Home by going to `Google Home > Set up device > Works with Google > turnsmart.io` and following the instructions.
7. Now you can control your device from Google Home and Google Assistant.
8. Enjoy making 🧑‍💻

## API Reference

The API is available on [io.karuppusamy.me/api](https://io.karuppusamy.me/api). It is a REST API that allows you to control your smart home devices. You can use the turnsmart API to control your smart home devices. The turnsmart API is secure and can be accessed from any device.

### Get data:

```
  GET /api
```

![Get request](/public/images/demo/api-get.jpg)

#### Request

You need to send the following headers with your request:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uid`     | `string` | **Required**. Your Project id     |
| `secret`  | `string` | **Required**. Your Project secret |

#### Response

The data on your project is returned in the response as a json object.

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `data`    | `json`   | Response data |
| `message` | `string` | Error message |

### Send data:

```
  POST /api
```

![Post request](/public/images/demo/api-post.jpg)

#### Request

You need to send the following headers with your request:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uid`     | `string` | **Required**. Your Project id     |
| `secret`  | `string` | **Required**. Your Project secret |
| `data`    | `json`   | **Required**. Data to be updated  |

#### Response

The status of the request is returned in the response.

| Parameter | Type     | Description      |
| :-------- | :------- | :--------------- |
| `message` | `string` | Response message |

## Dashboard Settings

### Endpoints section:

Endpoints are used to identify the data you want to store on turnsmart.io. You can create as many endpoints as you want. This data can be number or boolean or color.

### Data section:

In the data section, you will see the data of the endpoints you have added. You can modify the data directly from the dashboard. You can use the data to control your smart home devices. The data can be assessed using the turnsmart API from your device.

### Smarthome section:

In the smart home section, you can modify the Google Home integration settings. You can change device type or add/remove device traits.There are many device types available including: light, fan, switch, sensor, etc.

#### Device types

Device types are used by Google Assistant to determine what actions are available to the user. For example, if you define a device as a Light, the user can interact with the device through Google Assistant with Hey Google, turn on my light.

#### Device traits

Device traits are used to define the capabilities of the device. You can add as many traits as you want. For example, if you define a device as a Light, you can add the trait of brightness and color. There are many traits available including: on/off, brightness, color, etc.

For example,

1. You can add a "color" trait to a light device. This will allow you to control the color of the light.
1. You can also add a "brightness" trait to a light device. This will allow you to control the brightness of the light.

## Screenshots

![Login](/public/images/demo/login.jpeg)

![Dashboard](/public/images/demo/dashboard.jpeg)

![Project Dashboard](/public/images/demo/project-dashboard.jpeg)

## Development

1. Clone the repo `git clone https://github.com/karuppusamy-d/turnsmart.git`.
2. Create a new firebase project and setup firebase authentication, database, and storage.
3. Add firebase secrets to your `.env` file.
4. Run `yarn dev` or `npm run dev`.
5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Next.js

**Database:** Firebase Cloud Firestore

**Authentication:** Firebase Authentication

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Support

Using the project? Support this effort by giving a star on GitHub, giving a shoutout on Twitter or becoming a project [sponsor](https://github.com/sponsors/karuppusamy-d).

## Licence

[MIT](https://github.com/karuppusamy-d/turnsmart/blob/main/LICENSE) © [Karuppusamy](https://karuppusamy.me)
