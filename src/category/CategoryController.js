

'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Joi = require('joi');
const Category = require('./CategorySchema');

exports.create = async (req, res, next)=>{
  let category = new Category(req.body);
  category = await category.save();
  res.json(category);
  res.end();
};

exports.get = async (req, res, next)=>{
   let categories = await Category.find({});
   res.json(categories);
};

exports.getOne = async (req, res, next)=>{
    let category = await Category.findOne({'slug': req.params.slug});
    res.json(category);
};

exports.update = async (req, res, next)=>{
    let category = await Category.findOneAndUpdate({'slug': req.params.slug}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true});
    res.json(category);
};

exports.remove = async (req, res, next)=>{
  let category = await Category.findOneAndRemove({'slug': req.params.slug});
  res.json(category);
};


exports.validateCategory = async (req, res, next)=>{

    const schema = Joi.object().keys({
        name: Joi.string().required().label("name is invalid"),
        description: Joi.string().min(6).required().label("description is required"),
        status: Joi.string().required().label('not a valid status'),
        rank: Joi.number().max(10).required().label('must provide a valid rank'),
    });
  
    const result = Joi.validate(req.body, schema,{
        allowUnknown: true,
        abortEarly: false
    });
   
    if(result.error){
        const error = result.error.details.map(err => err.context.label);
        res.status(400);
        res.json(error);
        res.end();  
    } else{
        next();
    }

};