 'use strict';
 const mongoose = require('mongoose');
 mongoose.Promise = global.Promise;
const User = require('../src/user/UserSchema');

 exports.user = (req, res, next)=>{
    const token = req.header("access_token");
    User.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject();
        }
         
        req.user = user;
        req.token = token;
    }).catch((err) => {
        res.status(403);
        next(err);
    });
 };


 exports.admin = (req, res, next)=>{
    const token = req.header("access_token");
    User.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject();
        }
        
        if(user.role.is !==("admin" || "super")){
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
    }).catch((err) => {
        res.status(403);
        next(err);
    });
 };


 exports.super = (req, res, next)=>{
    const token = req.header("access_token");
    User.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject();
        }
        
        if(user.role.is !== "super"){
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
    }).catch((err) => {
        res.status(403);
        next(err);
    });
 };


 exports.restrict = (req, res, next)=>{
    const token = req.header("access_token");
    if(!token){
     res.status(404);
     return Promise.reject();
    }else{
        next();
    }
 };


 exports.isVerified = (req, res, next)=>{
    const token = req.header("access_token");
    if(!token){
     res.status(404);
     return Promise.reject();
    }else{
        User.findByToken(token).then((user)=>{
          if(!user || !(user.verified == true)){
              return Promise.reject('verify');
          }

          req.user = user;
          req.token = token;
          next();

        }).catch((err)=>{
         res.status(400);
         next(err);
        });
       
    }
 };