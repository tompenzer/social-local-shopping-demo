const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  name:  {
    type: String,
    index: true,
    required: [true, 'can\'t be blank']
  },
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
      type: Date,
      default: Date.now
    },
  }],
  description: String,
  image: String,
  products: [{type: Schema.Types.ObjectId, ref: "Product"}],
}, {timestamps: true});

mongoose.model('Store', StoreSchema);
