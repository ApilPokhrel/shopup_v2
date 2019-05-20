'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Joi = require('joi');
const Category = require('../category/CategorySchema');
const Store = require('../store/StoreSchema');
const Product = require('./ProductSchema');

exports.create = (req, res, next)=>{

};

exports.getByStore = (req, res, next)=>{

};

exports.getOne = (req, res, next)=>{

};


exports.update = (req, res, next)=>{

};

exports.remove = (req, res, next)=>{

};

exports.validate = (req, res, next)=>{
    let categoryNameArray = [];
    const categories = await Category.find({}).select('name -_id');
    for(let item of categories){           
      categoryNameArray.push(item.name);
    }  
    const schema = Joi.object().keys({
      
    category: Joi.string().valid(categoryNameArray).required().label('category is not defined'),
    name: Joi.string().required().label("name of Product cannot be null"),
    price: Joi.string().required().label("price is not valid"),
    type: Joi.string().required().label("type of Product cannot be null"),
    priceTag: Joi.string().required().label("not a valid price tag no"),
    quantity: Joi.string().required().label("quantity cannot be null"),
    description: Joi.string().required().label("description is required!"),
    shippingInfo: Joi.string().required().label("must provide shipping info"),
    bestFitFor: Joi.string().required().label("must give it"),

    colors: Joi.array().items(Joi.string()).min(1).max(12).label("colors is required field not more than 12"),
    sizes: Joi.array().items(Joi.string()).min(1).max(5).label("sizes is required not more than 5"),
    components: Joi.array().items(Joi.string()).min(1).max(12).label("materials is required not more than 12"),
    features: Joi.array().items(Joi.string()).min(1).max(7).label("features is required"),
    
});

const result = Joi.validate(req.body, schema,{
 allowUnknown: true,
 abortEarly: false
});

if(result.error){

   const error = result.error.details.map(err => err.context.label);
   await deleteFile(req.files);
   
} else{
    next();
}
};