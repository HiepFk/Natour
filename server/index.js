const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log(err);
  process.exit(1);
});

dotenv.config();

const app = require('./app');

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 8000;
const sever = app.listen(port, () => {
  console.log(`Sever running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection! 💥 Shutting down... ');
  console.log(err.name, err.message);
  console.log(err);
  sever.close(() => {
    process.exit(1);
  });
});
