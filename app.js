
    'use strict';

    const express = require('express');
    
    const app = express();

    const path = require('path');
    const bodyParser = require('body-parser');
    const helmet  = require('helmet');
    const compression = require('compression');
    const morgan = require('morgan');
    const errorHandler = require('./handler/ErrorHandler');
    const router = require('./router/index');

    //logger and security
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(compression());
    
    //html templates and file sevice
    app.use('/', express.static(__dirname+'/assets'));

    
    //payload handler
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    
    
    //proxy
    app.set('trust proxy', 1);
           

    app.use(async(req, res, next) => {
      
        next();
      });
    
    

      // app.get("/getUrl", (req, res)=>{
      
      // });

    //routes
    app.use('/', router);
   
    // Error Handelling 404
    app.use(errorHandler.notFound);
    
        
    if (app.get('env') === 'development') {
        /* Development Error Handler - Prints stack trace */
        app.use(errorHandler.developmentErrors);
      }
    
    app.use(errorHandler.productionErrors);
    
    
    module.exports = app;