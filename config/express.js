/**
 * Module dependencies.
 */

const express = require('express');
const session = require('express-session');

const mongoStore = require('connect-mongo')(session);
const config = require(__dirname + '/db');
const pkg = require(__dirname + '/../package.json');
const helpers = require('view-helpers');

const env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function (app) {
  // Static files middleware
  // app.use(express.static(__dirname + '/../public'));

  // set views path, template engine and default layout
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'jade');

  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: pkg.name,
    store: new mongoStore({
      url: config.DB,
      collection : 'sessions'
    })
  }));

  // declare this middleware after `connect-flash` and `express.session` middlewares and before `express.router`.
  app.use(helpers(pkg.name));

  if (env === 'development') {
    app.locals.pretty = true;
  }
};
