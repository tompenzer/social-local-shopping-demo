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

exports.nearest = function (req, res) {
  const user = req.profile;

  res.json(user);
  // Store.find({_id: {$in: user.followedStores}}, function(err, stores) {
  //   let productIds = [];
  //   stores.map((store) => { productIds = productIds.concat(store.products); });
  //
  //   Product.find({_id: {$in: productIds}}, function(err, products) {
  //     res.render('products/followed', {
  //       title: 'Suggestions for ' + user.name,
  //       products: products
  //     });
  //   });
  // });
};

/**
 *  Show a store's details.
 */

exports.show = function (req, res) {
  res.render('stores/show', {
    title: req.store.name,
    store: req.store
  });
};
