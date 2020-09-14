const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/user');

const localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: 'utilizator inexistent' });

    const valid = await user.isValidPassword(password);
    if (!valid) return done(null, false, { message: 'parolă greșită' });

    return done(null, user.toJSON());
  } catch (err) {
    done(err);
  }
});

module.exports = localStrategy;
