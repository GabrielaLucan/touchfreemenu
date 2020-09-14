const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config');
const User = require('../models/user');

exports.createAuthToken = (user) => {
  return jwt.sign({ user }, config.jwt.secret, {
    expiresIn: config.jwt.expiry,
  });
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info);
    const token = this.createAuthToken(user);
    res.json({ token });
  })(req, res);
};

exports.jwtAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'unauthorized' });
    req.user = user;
    next();
  })(req, res);
};

exports.getCurrentUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'unauthorized' });
    req.user = user;
    const fullUser = await User.findById(user.id).populate('restaurant').exec();

    return res.status(200).json({ ...fullUser.toObject() });
  })(req, res);
};

exports.postAuth = (req, res, next) => {
  if (req.post.author._id.equals(req.user.id) || req.user.admin) return next();
  res.status(401).end();
};

exports.commentAuth = (req, res, next) => {
  if (req.comment.author._id.equals(req.user.id) || req.post.author._id.equals(req.user.id) || req.user.admin) return next();
  res.status(401).end();
};
