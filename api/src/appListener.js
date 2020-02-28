const app = require('./app');

const API_PORT = process.env.PORT ? process.env.PORT : 9000;
app.listen(API_PORT, async () =>
  console.log(`YMCA API server listening on port ${API_PORT}!`),
);

process.on('unhandledRejection', error => {
  console.error(
    'ERROR: unhandledRejection, did you run `dotenv` before running index?',
    error.message,
  );
  process.exit(1);
});
