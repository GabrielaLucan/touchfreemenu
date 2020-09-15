module.exports = {
  port: process.env.PORT || 3000,
  db: {
    prod: process.env.DATABASE_URL || 'mongodb://localhost/touchfreemenu',
    test: 'mongodb://localhost/touchfreemenu_test',
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'development_secret',
    expiry: '7d'
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
    bucketName: process.env.AWS_BUCKET_NAME || 'touchfreemenu-dev',
  },
  registrationSecret: process.env.REGISTRATION_SECRET || 'dev'
};