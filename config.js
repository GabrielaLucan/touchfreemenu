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
    accessKey: 'AKIAJMNYQZCBF3CC7ABA',
    secretKey: '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',
    bucketName: 'touchfreemenu',
  },
  registrationSecret: process.env.REGISTRATION_SECRET || 'dev'
};
