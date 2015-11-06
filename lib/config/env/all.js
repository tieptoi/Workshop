'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
    facebookAuth: {
        clientID: process.env.FACEBOOK_SECRET || '478076455687750',
        clientSecret: process.env.FACEBOOK_APPID || '2625b072b57c2ee852c2523de376015e',
        callbackURL: 'http://localhost:9000/facebook'
    },
    token_secret: process.env.TOKEN_SECRET || 'JWT Token Secret',
    root: rootPath,
    port: process.env.PORT || 3000,
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    }
};
