const { validationResult } = require('express-validator/check');
//To avoid the sensitive data being visible from anyone
const bcrypt = require('bcryptjs');

//is used for stateless authentication mechanisms for users and providers, this means maintaining session is on the client-side instead of storing sessions on the server
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Veuillez entrer des informations valides.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;  
  const pseudo = req.body.pseudo;
  const dateNaissance = req.body.dateNaissance;
  const presentation = req.body.presentation;
  const photo = req.body.photo;
  const pays = req.body.pays;


  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
        pseudo: pseudo,
        name: name,
        dateNaissance: dateNaissance,
        presentation: presentation,
        photo: photo,
        pays: pays

      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'Votre compte a bien été créé.', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('Veuillez entrer un identifiant et un mot de passe corrects.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Veuillez entrer un identifiant et un mot de passe corrects.');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};