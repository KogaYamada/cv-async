const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');

const { json } = require('body-parser');

const User = require('./models/user');
const { parse } = require('path');

dotenv.config();
const app = express();

app.use(cors());
app.use(json());

const html = fs.readFileSync(`${__dirname}/index.html`, 'utf-8');
const usersJSON = fs.readFileSync(`${__dirname}/db.json`, 'utf-8');
const users = JSON.parse(usersJSON);
/* データベース接続
mongoose
  .connect(process.env.DATABASE , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('データベース接続成功'))
  .catch((error) => console.log('データベース接続失敗', error));
*/

// routes
app.get('/', (req, res) => {
  res.send(html);
});

app.get('/user', (req, res) => {
  const { apikey } = req.headers;
  if (apikey !== 'key123') res.status(401).send('apikeyが間違っています');

  res.json(users);
});

app.post('/user', async (req, res) => {
  const { apikey } = req.headers;
  if (apikey !== 'key123') res.status(401).send('apikeyが間違っています');
  if (!req.body.name) res.status(400).send('必須項目がありません');
  if (!req.body.email) res.status(400).send('必須項目がありません');

  const reqObj = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    skills: req.body.skills ? [...req.body.skills] : [],
  };
  fs.writeFileSync(
    `${__dirname}/db.json`,
    JSON.stringify(users.concat(reqObj))
  );
  res.json(reqObj);
});
/* mongodb
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
*/
app.listen(process.env.PORT || 8000, () => {
  console.log(`サーバー起動: http://localhost:${process.env.PORT || 8000}`);
});
