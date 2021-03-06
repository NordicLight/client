'use strict';

//http://www.sitepoint.com/deploying-yeomanangular-app-heroku/
//https://github.com/nknj/heroku-buildpack-yo-angular

var gzippo = require('gzippo');
var express = require('express');
var logger = require('morgan');
var nodeApp = express();

nodeApp.use(logger('dev'));
nodeApp.use(gzippo.staticGzip('' + __dirname + '/dist'));
nodeApp.listen(process.env.PORT || 5000);