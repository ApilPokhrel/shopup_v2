
  'use strict';


  const mongoose = require('mongoose');
  const https = require('https');
  const http = require('http');
  const path = require('path');

  
  
  //env variables
  require('dotenv').config({path: 'variables.env'});
  
  const PORT = process.env.PORT || 3000;
  const HOST = '0.0.0.0';
  
  
  
  
  //database config with mongoose
  mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true });
  mongoose.set('useCreateIndexes', true);
  mongoose.set('useFindAndModify', false);
  mongoose.Promise = global.Promise;
  mongoose.connection.on('error', (err)=>{
      console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
  });
  


  
  
  //Schemas import here..

  
  
  //notification

  
  
  const app = require('./app');
  
  const server = http.createServer(app);
  
  
  //socket instance 
  
  //here goes socket content..... import socket file
  
  
  
  //starting server
  server.listen(PORT, (err)=>{
      if(err){
      console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
      }
  
      console.log('server started in '+ PORT);
  });
  