# [turnsmart.io](https://io.karuppusamy.me)

It is an [open-source](https://github.com/karuppusamy-d/turnsmart) smart home development platform that allows you to build and deploy your smart home devices on your own. It supports a wide range of devices, including ESP8266, ESP32, Arduino, Raspberry Pi, and more.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/karuppusamy-d/turnsmart)

[Example projects](https://github.com/karuppusamy-d/turnsmart-examples.git)

## Features

- Self Hosted
- Easy to setup
- Google Home integration
- One-click Google Assistant integration
- Customizable traits
- Works with ESP32, ESP8266, and Raspberry Pi or other microcontrollers (e.g. Arduino)
- Secure API

## Quick Start Guide

1. Clone the repo and [deploy](#deploy-guide).
1. Create a account and login with new account.
1. Create a new project and add required [endpoints](#endpoints-section).
1. Enable smarthome in project settings and choose the [device type](#device-type).
1. Add required [traits](#device-traits) and update target endpoints for each trait.
1. Connect your smarthome device to the website using the [API](#api-reference).
1. Connect your device to Google Home by going to `Google Home > Set up device > Works with Google > turnsmart` and following the instructions.
1. Now you can control your device from Google Home and Google Assistant.
1. Enjoy making 🧑‍💻

## Deploy Guide

1. Clone the repo and deploy it on [vercel](https://vercel.com/new/git/external?repository-url=https://github.com/karuppusamy-d/turnsmart) or any other cloud provider.
2. Create a new [Firebase project](https://console.firebase.google.com/).
3. Enable Firebase Authentication and add your domain in authorised domains.
4. Enable Firebase Database and setup firebase rules as in `firebase.rules` file.
5. Enable Firebase Storage and setup respective rules.
6. Create a new Firebase webapp by going to project settings.
7. Create a new Firebase Admin key by going to `Project settings > Service accounts > Generate a new private key`.
8. Update the environment variables.
9. Create a new Actions project by going to [actions console](https://console.actions.google.com/) and selecting your existing firebase project.
10. Set category as `Smart Home` and name your project.
11. Setup Account linking by going to `Develop > Account linking` and using the values below.

| Field             | Value                                      |
| :---------------- | :----------------------------------------- |
| Client ID         | environment variable: GOOGLE_CLIENT_ID     |
| Client secret     | environment variable: GOOGLE_CLIENT_SECRET |
| Authorization URL | https://your-domain/login                  |
| Token URL         | https://your-domain/api/auth/token         |

## API Reference

The API is available on `your-domain/api`. It is a REST API that allows you to control your smart home devices. You can use the turnsmart API to control your smart home devices. The turnsmart API is secure and can be accessed from any device.

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
