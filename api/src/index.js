const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

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
