'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    express = require('express'),
    // async = require('async'),
    request = require('request'),
    config = require('../config/config'),
    moment = require('moment'),
    // bcrypt = require('bcryptjs'),
    jwt = require('jwt-simple'),
    User = mongoose.model('User');

// As with any middleware it is quintessential to call next()
// if the user is authenticated
exports.isAuthenticated = function (req, res, next) {
    console.log('isAuthenticated');
    if (req.isAuthenticated())
        return next();
    res.send(401);
    //res.redirect('/');
};
