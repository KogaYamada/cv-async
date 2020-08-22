const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const { json } = require('body-parser');

const User = require('./models/user');

dotenv.config();
const app = express();

app.use(cors());
app.use(json());

// db接続
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('データベース接続成功'))
  .catch((error) => console.log('データベース接続失敗', error));

// routes
app.get('/user', async (req, res) => {
  console.log('body', req.body);
  console.log('header', req.headers);
  const { apikey } = req.headers;
  if (apikey !== 'key123') res.status(401).send('apikeyが間違っています');
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(400).send('不正なリクエストです');
  }
});

app.post('/user', async (req, res) => {
  console.log('body', req.body);
  console.log('header', req.headers);
  const { apikey } = req.headers;
  if (apikey !== 'key123') res.status(401).send('apikeyが間違っています');
  const { name, email, skills } = req.body;
  const newUser = new User({ name, email, skills });
  try {
    await newUser.save();
  } catch (error) {
    console.log('ERROR', error);
    res.status(400).send('不正なリクエストです');
  } finally {
    res.send(newUser);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`サーバー起動: http://localhost:${process.env.PORT}`);
});
