const app = require('./app');

const API_PORT = process.env.PORT === undefined ? 9000 : process.env.PORT;
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
