const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');

require('dotenv').config();

const mongoDBPassword = process.env.MONGODB_PASSWORD;
const mongoURI = `mongodb+srv://fxduke:${mongoDBPassword}@cluster0.n4wsr.mongodb.net/auth?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected.'))
  .catch(console.error);

const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Listen port ${PORT}...`);
});
