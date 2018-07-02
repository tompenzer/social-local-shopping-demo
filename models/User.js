const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const XRegExp = require('xregexp');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:  {
    type: String,
    index: true,
    unique: true,
    required: [true, 'can\'t be blank'],
    validate: {
      isAsync: true,
      validator: function(v, cb) {
        setTimeout(function() {
          // Use XRegExp for unicode character property expression support.
          // Matches one or more groups of one or more alphanumeric characters,
          // each optionally terminated with a period and/or comma, and each
          // separated by a single space, apostrophe, underscore or dash. The
          // final group can only optionally be terminated by a period.
          var nameRegex = XRegExp('^(?:[\\pL\\pM\\pN]+\.?,?[\\pZ\'_-])*[\\pL\\pM\\pN]+\.?$');
          var msg = v + ' does not appear to be in the format of a name; special characters are prohibited.';
          // First argument is a boolean, whether validator succeeded
          // 2nd argument is an optional error message override
          cb(nameRegex.test(v), msg);
        }, 5);
      },
      // Default error message, overridden by 2nd argument to `cb()` above
      message: 'Default error message'
    }
  },
  email: {
    type: String,
    lowercase: true,
    index: true,
    unique: true,
    validate: {
      isAsync: true,
      validator: function(v, cb) {
        setTimeout(function() {
          var emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
          var msg = v + ' does not appear to be a valid email address.';
          // First argument is a boolean, whether validator succeeded
          // 2nd argument is an optional error message override
          cb(emailRegex.test(v), msg);
        }, 5);
      },
      // Default error message, overridden by 2nd argument to `cb()` above
      message: 'Default error message'
    },
    required: [true, 'User email is required']
  },
  bio: String,
  image: String,
  followedStores: [{type: Schema.Types.ObjectId, ref: "Store"}, {timestamps: true}],
  ownedStores: [{type: Schema.Types.ObjectId, ref: "Store"}, {timestamps: true}],
  locations: [{
    latitude: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    longitude: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    createdAt: {
      type : Date,
      default : Date.now
    },
  }],
  hash: String,
  salt: String
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

/**
 * Methods
 */

UserSchema.methods = {
  /**
   * Set password
   *
   * @param {String} password
   * @api private
   */
  setPassword: function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  },

  /**
   * Validate password
   *
   * @param {String} password
   * @api private
   */
  validPassword: function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
  },

  /**
   * Update user location
   *
   * @param {String} latitude
   * @param {String} longitude
   * @api private
   */
  addLocation: function(latitude, longitude){
    this.locations.push({
      latitude: latitude,
      longitude: longitude
    });
  },
}

/**
 * Statics
 */

UserSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || '_id name email image bio createdAt followedStores locations';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  },

  /**
   * List users
   *
   * @param {Object} options
   * @api private
   */
  list: function (options) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 30;
    return this.find(criteria)
      .populate('user', 'name')
      .sort({ name: 1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
};

module.exports = mongoose.model('User', UserSchema);
