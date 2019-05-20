'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slugify = require('slugify');

let categorySchema = mongoose.Schema({

  name: {type: String, trim: true, min: 50, required: true, unique: true},
  slug: {type: String, trim: true, unique: true},
  rank: {type:Number, },
  status: {type: String},
  description: {type: String, trim: true},
  createdBy: {type: mongoose.Schema.Types.ObjectId ,  ref: 'User'},
  modifiedBy: {type: mongoose.Schema.Types.ObjectId ,  ref: 'User'},
  types:[String],
  tags:[String]
},{
  timestamps: true
});

categorySchema.pre('save', function(next){
  var category = this;
  if(user.isModified('name')){
     category.slug = slugify(user.slug, {
          replacement: '-',    
          remove: null,        
          lower: true         
        });
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);