# YMCA API

This folder contains the backend api of the application.

## Environments

There are three environments that the backend runs in: `production`, `dev`, and `test`, each with their own database. `production` is set on deployment, `dev` is set whenever running locally, and `test` is set when tests are running. These environments are automatically set based on the task.

## Install & Run

To set up, first create a `/config` directory in the `/api` directory. Then, create three `.env` files: `production.env`, `dev.env`, and `test.env`. Each should contain the following field, with unique values (a seperate database for each environment).

```
MONGO_URL=mongodb://<username>:<password>@<id>.mlab.com:<id/project>
```

Make sure that you have `dotenv-cli` installed globally with,

```
yarn global add dotenv-cli
```

Then,

```bash
yarn && yarn start
```

This will create a server on [http://localhost:9000](http://localhost:9000).

## Technologies

Built with [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/).

## Development

If you are working with the API, remember to change the `baseURL` in [`client/src/utils/api.js`](https://github.com/hack4impact-uiuc/ymca/blob/master/client/src/utils/api.js) to the local server `http://localhost:9000/`.

### Code Style

Use [ESLint](https://eslint.org) with [Prettier](https://prettier.io/).

## Testing

The unit tests are written with [Jest](https://jestjs.io/) and [SuperTest](https://github.com/visionmedia/supertest).

To test,

```js
yarn test
```
