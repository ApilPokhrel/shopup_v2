'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uuid = require('uuid/v4');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');


const userSchema = mongoose.Schema({
 name: {
     first: {type: String, trim: true, lowercase: true},
     middle: {type: String, trim: true, lowercase: true},
     last: {type: String, trim: true, lowercase: true},
 },
  email: { type: String, unique: true, trim: true, lowercase: true},
  phone: { type: String,unique: true, trim: true, lowercase: true},
  password: { type: String, trim: true, lowercase: true},
  role:{
      is:{type: String,trim: true, lowercase: true},
      permissions:[{type: String, lowercase: true, trim: true}]
  },
  slug:{
    type: String,
    required: true,
    default: uuid()
  },
 verified:{type: Boolean, default: false},
  profiles:[String],

tokens:[{
    access:{
        type:String,
        required: true
    },

    token:{
        type:String,
        required: true
    },
    
}],
stores: [{type: mongoose.Schema.Types.ObjectId, ref: 'Store'}]

},{timestamps: true});


userSchema.pre('save', function(next){

    try{
        var user = this;
        if(user.isModified('name')){
           user.slug = slugify(user.slug, {
                replacement: '-',    
                remove: null,        
                lower: true         
              });
        }
        if(user.isModified('password')){
            bcrypt.genSalt(13, function(err, salt){
                if(err){
                    return Promise.reject();
                }

                bcrypt.hash(user.password, salt, function(err, hash){
              if(err){
                  return Promise.reject();
              }


              user.password = hash;
              next();
                });
            })
        }

        else{
            next();
        }


    }catch(e){
        next(e);
    }

});

const cryptoEncrypt = function(plain, secret){
    var mykey = crypto.createCipher('aes-128-cbc', secret);
    var mystr = mykey.update(plain, 'utf8', 'hex')
    mystr += mykey.update.final('hex');
    return mystr; 
};


const cryptoDecrypt = function(hash, secret){
        var mykey = crypto.createDecipher('aes-128-cbc', secret);
        var mystr = mykey.update(hash, 'hex', 'utf8')
        mystr += mykey.update.final('utf8');
        return mystr;
};

userSchema.methods.generateAuthToken = function (){
       try{

        var user = this;

        const access = "auth";
        const token =  jwt.sign({_id: user._id.toHexString(), access},process.env.JWT_SECRET);
        token =  cryptoEncrypt(token, process.env.CRYPTO_SECRET);
        user.tokens.push({access, token});
        return user.save().then(function(){
            return token;
        });
       }catch(err){
           console.log('error in generating token ', err);
           return Promise.reject();
       }
};


userSchema.statics.findByToken =  function(token){

        var User = this;
        var decoded;
 
    try{

      let decryptToken =  cryptoDecrypt(token, process.env.CRYPTO_SECRET);   
      decoded = jwt.verify(decryptToken, process.env.JWT_SECRET);
      
    }catch(err){
        console.log('error in decoding '+err);
        return Promise.reject();
    }


    return  User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'apil'
    });
   

};






userSchema.statics.findByCredentials =  function(email, password){

    var User = this;

  return User.findOne({email}).then((user)=>{
    if(!user){
        return Promise.reject();
    }

    return new Promise((resolve, reject)=>{

        bcrypt.compare(password, user.password, (err, res)=>{
                 if(res){
                     resolve(user);
                 } else{
                     reject();
                 }
        });
    });
});


};



userSchema.methods.removeToken =  function(token){
    var user = this;
    return user.update({
        $pull:{
            tokens:{
                token: token
            }
        }
    })
};


module.exports = mongoose.model('User', userSchema);
