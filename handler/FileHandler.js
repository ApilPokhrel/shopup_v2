'use strict';

const multer = require('multer');


exports.upload = (req, res, next)=>{
   req.filename = filename;
   next();
};


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./assets/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, uuid.v4()+'.'+file.mimetype.split('/')[1])
    }
  });


const multerUpload =  multer({ storage: storage ,
    fileFilter(req, file, cb){
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto){ 
 
    cb(null, true);
    } else{

    cb({message:'type of file is not supported'}, false);
    }
 
}});


exports.upload = async (req, res, next)=>{
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }
  });
    const files = await multerUpload;
    req.files = files;
    next();
 };
 
   
 exports.delete = (filename)=>{
    var fs = require('fs');
    var filePath = './assets/uploads/'+filename; 
    fs.unlinkSync(filePath);
  };

  



        