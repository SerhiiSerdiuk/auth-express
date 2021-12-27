const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.postSignup = (req, res, next) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send({ error: 'The confirmation password is not equal to the password' });
  }

  User.find({ username: username }).exec((err, users) => {
    if (err) {
      return next(err);
    }

    const isUser = users && users.some((user) => user.username === username);
    if (!isUser) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          return next(err);
        }

        const user = new User({ username, password: hash });
        user
          .save()
          .then(() => {
            console.log(`User with username "${username}" is saved`);
            res.json({ username });
          })
          .catch((error) => {
            return next(error);
          });
      });
    } else {
      res.status(409).send({ error: 'User exists' });
    }
  });
};

exports.postLogin = (req, res, next) => {
  const { username } = req.body;
  res.json({ username });
};
