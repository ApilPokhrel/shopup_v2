'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const productSchema = mongoose.Schema({
      category:{type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
      model:{type: String, trim: true},
      name:{type: String, trim: true},
      images:[String],
      video:{type: String, trim: true},
      colors: [String],
      width:{type: Number},
      height:{type: Number},
      type:{type:String, trim:true},
      features:[String],
      price:{type:Number, trim:true},
      priceTag:{type:Number, trim:true},
      priceRange:[{amount: String, quantity: Number}],
      review:{type: mongoose.Schema.Types.ObjectId ,  ref: 'Review'},
      brand:{type: String ,  trim: true},
      description:{type: String , required: true, trim: true},
      weight:{type: Number ,  trim: true},
      store:{type: mongoose.Schema.Types.ObjectId , ref: 'Store'},
      quantity:{type:Number, trim:true},
      shippingInfo:{type:String, trim:true},
      preferdCountry:{type:String, trim:true},
      warranty:{type: String},
      madeIn: {type: String, trim: true},
      sizes: [String],
      components: [{type: String, trim: true}],
      bestFitFor: {type: String, trim: true},
      returnInfo:{type: String, trim: true},
      soldQuantity:{type: Number, trim: true},
      special: {type: String, trim: true}//regilious event like holi, christmas

},{
  timestamps: true
});


productSchema.index({
  name: 'text',
  description: 'text',
  features: 'text',
  components: 'text',
  special: 'text'
});

module.exports = mongoose.model('Product', productSchema);
