const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name:  {
    type: String,
    index: true,
    required: [true, 'can\'t be blank']
  },
  description: String,
  images: [{type: String}],
  url: String,
  categories: [{type: Schema.Types.ObjectId, ref: "Category"}],
  price: String,
  priceMSRP: String,
  manufacturer: String,
  color: String,
  size: String,
  modelId: String,
  sku: String,
  upc: String,
  likes: [{
    user: {type: Schema.Types.ObjectId, ref: "User"},
    createdAt: { type : Date, default : Date.now },
  }],
}, {timestamps: true});

/**
 * Statics
 */

ProductSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || '_id name description images url categories price priceMSRP createdAt';
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
      .populate('product', 'name ')
      .sort({ name: 1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
};

mongoose.model('Product', ProductSchema);
