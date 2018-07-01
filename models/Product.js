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
  category: [{type: Schema.Types.ObjectId, ref: "Category"}],
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

mongoose.model('Product', ProductSchema);
