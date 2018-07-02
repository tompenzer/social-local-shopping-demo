const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  name:  {
    type: String,
    index: true,
    required: [true, 'can\'t be blank']
  },
  location: {
    type: [Number],
    index: '2d'
  },
  description: String,
  image: String,
  products: [{type: Schema.Types.ObjectId, ref: "Product"}],
}, {timestamps: true});

/**
 * Statics
 */

StoreSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || '_id name description image locations products createdAt';
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
      .populate('store', 'name')
      .sort({ name: 1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
};

mongoose.model('Store', StoreSchema);
