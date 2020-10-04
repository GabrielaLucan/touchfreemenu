const demoRequests = require('./controllers/demoRequests');
const users = require('./controllers/users');
const auth = require('./services/auth');
const express = require('express');
const router = express.Router();

router.post('/request-demo', demoRequests.requestDemo);
router.post('/login', users.login);
router.post('/change-password', auth.withCurrentUser, users.changePassword);
router.post('/register', users.validate(), users.register);
router.get('/get-current-user', auth.withCurrentUser, users.getCurrentUser);

router.post('/pdf-menu', auth.withCurrentUser, users.uploadFileToS3, users.updatePdfMenuUrl);

// router.param('post', posts.load);
// router.get('/posts', posts.list);
// router.get('/posts/:category', posts.listByCategory);
// router.get('/post/:post', posts.show);
// router.post('/posts', [jwtAuth, posts.validate], posts.create);
// router.delete('/post/:post', [jwtAuth, postAuth], posts.destroy);
// router.get('/post/:post/upvote', jwtAuth, posts.upvote);
// router.get('/post/:post/downvote', jwtAuth, posts.downvote);
// router.get('/post/:post/unvote', jwtAuth, posts.unvote);
// router.get('/user/:user', posts.listByUser);

// router.param('comment', comments.load);
// router.post('/post/:post', [jwtAuth, comments.validate], comments.create);
// router.delete('/post/:post/:comment', [jwtAuth, commentAuth], comments.destroy);

module.exports = (app) => {
  app.use((req, res, next) => {
    if (req.headers.host.includes('admin.')) {
      if (process.env.IS_PROD) {
        express.static('admin/build')(req, res, next);
      } else {
        express.static('admin/public')(req, res, next);
      }
    } else {
      express.static('presentation-site')(req, res, next);

      // app.get('/:restaurantSlug', users.showPdfMenu);
      app.get('/:restaurantSlug', users.showWebMenu);

      app.use('/api', router);

      app.get('/:restaurantSlug/my-qr-code.svg', users.downloadQrCode);

      app.use(express.static('web-menu'));

      app.get('/yourname', (req, res) => {
        res.sendFile('presentation-site/scan-succesful.html', { root: __dirname });
      });

      app.get('*', (req, res, next) => {
        res.status(404).json({ message: 'not found' });
      });

      app.use((err, req, res, next) => {
        if (err.type === 'entity.parse.failed') {
          return res.status(400).json({ message: 'bad request' });
        }
        if (err.type === 'invalidFileName') {
          return res.status(400).json({ message: err.message });
        }
        return res.status(500).json(err);
      });
    }
  });
};
