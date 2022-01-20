# turnsmart.io

It is a open source project that simplifies the process of creating and integrating IoT projects with Google assistant by providing an easy to use API.

[Link to website](https://io.karuppusamy.me)

[Example projects](https://github.com/karuppusamy-d/turnsmart-examples.git)

## Features

- Easy to setup
- Secure API
- Google Home integration
- PWA support
- Light and Dark theme

## Quick Start Guide

1. Create a account with [turnsmart.io](https://io.karuppusamy.me)
2. Create a new project and add required endpoints
3. Enable smarthome in project settings
4. Add required traits and update target endpoints for each trait
5. Connect your device with api endpoint.
6. Send and receive data from your device using api endpoint.
7. Connect your project with google home.
8. Enjoy making 🧑‍💻

## API Reference

### Get data

```http
  GET /api
```

![Get request](/public/images/demo/api-get.jpg)

#### Request

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uid`     | `string` | **Required**. Your Project id     |
| `secret`  | `string` | **Required**. Your Project secret |

#### Response

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `data`    | `json`   | Response data |
| `message` | `string` | Error message |

### Send data

```http
  POST /api
```

![Post request](/public/images/demo/api-post.jpg)

#### Request

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uid`     | `string` | **Required**. Your Project id     |
| `secret`  | `string` | **Required**. Your Project secret |
| `data`    | `json`   | **Required**. Data to be updated  |

#### Response

| Parameter | Type     | Description      |
| :-------- | :------- | :--------------- |
| `message` | `string` | Response message |

## Screenshots

![Login](/public/images/demo/login.jpeg)

![Dashboard](/public/images/demo/dashboard.jpeg)

![Project Dashboard](/public/images/demo/project-dashboard.jpeg)

## Development

1. `git clone https://github.com/karuppusamy-d/turnsmart.git`
2. Add environment variables
3. Run `yarn dev` or `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser.
5. Deploy on Vercel

## Deploy

The easiest way to deploy the template is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

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
