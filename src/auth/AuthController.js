'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const User = require('../user/UserSchema');

exports.login = async (req, res, next)=>{
   const body = {email: req.body.email, password: req.body.password};
   const user = await User.findByCredentials(body.email, body.password);
   const token = await user.generateAuthToken();
   res.header("access_token", token);
   res.json(user);
   res.end();

};


exports.register = (req, res, next)=>{
   const user = new User(req.body);

   user.save().then((user)=>{
    return user.generateAuthToken();
   }).then((token)=>{
    res.header("access_token", token);
    res.json(user);
    res.end();
   }).catch((e)=>{
       res.status(400);
       next(e);
   })
};


exports.logout = (req, res, next)=>{
  req.user.removeToken(req.token).then(()=>{
      res.status(200);
      res.end();
  }, ()=>{
      res.status(400);
      res.end();
  })
}