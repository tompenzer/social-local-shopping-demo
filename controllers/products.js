const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Product = mongoose.model('Product');
const Store = mongoose.model('Store');


/**
 * Load
 */

exports.load = async(function* (req, res, next, _id) {
  const criteria = { _id };
  try {
    req.product = yield Product.load({ criteria });
    if (!req.product) return next(new Error('Product not found.'));
  } catch (err) {
    return next(err);
  }
  next();
});

/**
 *  Show the products from stores a user follows.
 */

exports.followed = function (req, res) {
  const user = req.profile;

  Store.find({_id: {$in: user.followedStores}}, function(err, stores) {
    let productIds = [];
    stores.map((store) => { productIds = productIds.concat(store.products); });

    Product.find({_id: {$in: productIds}}, function(err, products) {
      res.render('products/followed', {
        title: 'Suggestions for ' + user.name,
        products: products
      });
    });
  });
};

/**
 *  Show a product's details.
 */

exports.show = function (req, res) {
  res.render('products/show', {
    title: req.product.name,
    product: req.product
  });
};
