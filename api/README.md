# YMCA API

This folder contains the backend api of the application.

## Install & Run

To set up, first create a `.env` file in the `/api` directory that contains the following field.

```
MONGO_URL=mongodb://<username>:<password>@<id>.mlab.com:<id/project>
```

Then, 

```bash
yarn
yarn start
```

This will create a server on [http://localhost:9000](http://localhost:9000).

## Technologies

Built using Express and MongoDB.

### Code Style

Use [ESLint](https://eslint.org) with [Prettier](https://prettier.io/).
