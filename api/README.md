# YMCA API

This folder contains the backend api of the application.

## Install & Run

To set up, first create a `.env` file in the `/api` directory that contains the following field.

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
