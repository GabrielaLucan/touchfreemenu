const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  (token, done) => done(null, token.user)
);

module.exports = jwtStrategy;
