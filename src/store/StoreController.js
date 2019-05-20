"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Store = require("./StoreSchema");
const Category = require("../category/CategorySchema");

exports.create = async (req, res, next) => {
  let store = new Store(req.body);
  store.name = req.body.name.replace(/\s/g, "");
  store.location.coordinates.push(req.body.lng, req.body.lat);
  store.location.address = req.body.address;
  store.user = req.user._id;
  store = await store.save();
  res.json(store);
  res.end();
};

exports.get = async (req, res) => {
  let stores = await Store.find({});
  res.json(stores);
};

exports.getOne = async (req, res) => {
  let store = await Store.findOne({ name: req.params.name });
  res.json(store);
  res.end();
};

exports.update = async (req, res, next) => {
  let store = new Store(req.body);
  store.name = req.body.name.replace(/\s/g, "");
  store.location.coordinates.push(req.body.lng, req.body.lat);
  store.location.address = req.body.address;
  store = await Store.findOneAndUpdate({ name: req.params.name }, store, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true
  });
  res.json(store);
};

exports.remove = async (req, res, next) => {
  let store = await Store.findOneAndRemove({ name: req.params.name });
  res.json(store);
};

exports.validateStore = async (req, res, next) => {
  let categoryNameArray = [];
  const categories = await Category.find({}).select("name -_id"); // select only name and remove _id
  for (let item of categories) {
    categoryNameArray.push(item.name);
  }

  const schema = Joi.object().keys({
    name: Joi.string()
      .required()
      .label("name is invalid"),
    address: Joi.string()
      .min(6)
      .required()
      .label("address is invalid"),
    lng: Joi.number()
      .required()
      .label("not a valid longitude"),
    lat: Joi.number()
      .required()
      .label("not a valid latitude"),
    tags: Joi.array()
      .valid(categoryNameArray)
      .items(Joi.string())
      .min(1)
      .max(5)
      .label("tags are required not more than 5"),
    description: Joi.string()
      .min(20)
      .max(2000)
      .required()
      .label("regard a valid description")
  });

  const result = Joi.validate(req.body, schema, {
    allowUnknown: true,
    abortEarly: false
  });

  if (result.error) {
    const error = result.error.details.map(err => err.context.label);
    res.status(400);
    res.json(error);
    res.end();
  } else {
    next();
  }
};
