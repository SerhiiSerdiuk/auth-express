const express = require('express');
const authRouter = require('./routes/auth');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Listen port ${PORT}...`);
});
