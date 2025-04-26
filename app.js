const express = require("express");
require('dotenv').config();
const db = require('./models/db');

//const mongoose = require('mongoose');

const User = require('./models/user');
const app = express();

app.post('/create-user', async (req, res) => {
  const user = await User({
    teamname: 'Mavs',
    playoff: 'False',

  });
  res.json(user);
  await user.save();
})

console.log("MONGO_URI:", process.env.MONGO_URI);

/*mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected successfully"))
  .catch((e) => console.log("MongoDB connection error:", e));
*/


app.get('/',(req, res) => {
    res.send('Hello World');
});

app.listen(8000, () => {
    console.log('port is listening');
});

