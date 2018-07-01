const mongoose = require('mongoose');
const { wrap: async } = require('co');
const User = mongoose.model('User');

/**
 * Load
 */

exports.load = async(function* (req, res, next, _id) {
  const criteria = { _id };
  try {
    req.profile = yield User.load({ criteria });
    if (!req.profile) return next(new Error('User not found'));
  } catch (err) {
    return next(err);
  }
  next();
});

/**
 *  List
 */

exports.index = async(function* (req, res) {
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const _id = req.query.item;
  const limit = 20;
  const options = {
    limit: limit,
    page: page
  };

  if (_id) options.criteria = { _id };

  const users = yield User.list(options);
  const count = yield User.count();

  res.render('users/index', {
    title: 'Users',
    users: users,
    page: page + 1,
    pages: Math.ceil(count / limit)
  });
});

/**
 *  Show profile
 */

exports.show = function (req, res) {
  const user = req.profile;
  res.render('users/show', {
    title: user.name,
    user: user
  });
};
