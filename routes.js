const demoRequests = require('./controllers/demoRequests');
const express = require('express');
const subdomain = require('express-subdomain');
const router = express.Router();

router.post('/request-demo', demoRequests.requestDemo);
// router.post('/login', users.validate(), users.login);

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
  // app.use(express.static('client/public'));

  app.use((req, res, next) => {
    if (req.headers.host.includes('admin.')) {
      // express.static('admin/build')(req, res, next);
      express.static('admin/public')(req, res, next);
    } else {
      express.static('presentation-site')(req, res, next);
    }
  });

  app.use('/api', router);

  app.get('*', (req, res, next) => {
    res.status(404).json({ message: 'not found' });
  });

  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ message: 'bad request' });
    }
    next(err);
  });
};
