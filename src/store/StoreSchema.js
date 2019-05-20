const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slugify = require('slugify');

var storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Please enter a store name!'
  },
  
  description: {
    type: String,
    trim: true
  },
  categories: [{type: mongoose.Schema.Types.ObjectId, ref:'Category'}],

  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }],
    address: {
      type: String,
      required: 'You must supply an address!'
    }
  },
  files:[{
    type:{type: String},
    name: {type: String}
   }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'You must supply an author'
  }
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});


storeSchema.virtual('products',{
  ref: 'Product',
  localField: '_id',
  foreignField: 'store'
});

// Define our indexes
storeSchema.index({
  name: 'text',
  description: 'text'
});

storeSchema.index({ location: '2dsphere' });



module.exports = mongoose.model('Store', storeSchema);
