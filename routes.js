const users = require('./controllers/users');
// const stores = require('./controllers/stores');
// const products = require('./controllers/products');

module.exports = function (app) {
  // home route
  app.get('/', users.index);

  // user routes
  app.param('userId', users.load);
  app.get('/users', users.index);
  app.get('/users/:userId', users.show);

  // store routes
  // app.get('/nearby/:userId', stores.nearby);

  // product routes
  // app.get('/products/:userId', products.followed);

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
      res.status(422).render('422', { error: err.stack });
      return;
    }

    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    const payload = {
      url: req.originalUrl,
      error: 'Not found'
    };
    if (req.accepts('json')) return res.status(404).json(payload);
    res.status(404).render('404', payload);
  });
};
