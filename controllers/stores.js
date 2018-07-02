const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Store = mongoose.model('Store');


/**
 * Load
 */

exports.load = async(function* (req, res, next, _id) {
  const criteria = { _id };
  try {
    req.store = yield Store.load({ criteria });
    if (!req.store) return next(new Error('Store not found.'));
  } catch (err) {
    return next(err);
  }
  next();
});

/**
 *  Show the stores closest to a user's last location'.
 */

exports.nearby = async(function* (req, res) {
  const user = req.profile;
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const limit = 20;
  const options = {
    limit: limit,
    page: page
  };

  if (user.lastLocation) {
    options.criteria = {
      location: {
        $near: user.lastLocation,
        $maxDistance: 50
      }
    };
  }

  const stores = yield Store.list(options);
  const count = yield Store.count();

  res.render('stores/nearby', {
    title: 'Nearby stores',
    stores: stores,
    page: page + 1,
    pages: Math.ceil(count / limit)
  });
});

/**
 *  Show a store's details.
 */

exports.show = function (req, res) {
  res.render('stores/show', {
    title: req.store.name,
    store: req.store
  });
};
