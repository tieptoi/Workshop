'use strict';

var api = require('./controllers/api'),
    item = require('./controllers/item'),
    order = require('./controllers/order'),
    menu = require('./controllers/menu'),
    auth = require('./controllers/auth'),
    user = require('./controllers/user'),
    index = require('./controllers/index'),
    flash = require('connect-flash'),
    request = require('request'),
    config = require('./config/config'),
    mongoose = require('mongoose'),
    jwt = require('jwt-simple'),
    User = mongoose.model('User');

/**
 * Application routes
 */
module.exports = function (app, passport) {

    // Server API Routes
    app.get('/api/awesomeThings', api.awesomeThings);
    app.get('/api/awesomeThing/:id', api.awesomeThing);
    app.post('/api/addThing', api.addThing);
    //Item
    app.get('/api/items', item.items);
    app.get('/api/items/pages/:qpages/size/:qsize/sort/:qsort', item.itemsByPage);
    app.get('/api/noofitems', item.noOfItems);
    app.get('/api/item/:qkey/:qvalue', item.item);
    app.get('/api/removeItem/:qkey/:qvalue', item.removeItem);
    app.post('/api/additem', auth.ensureAuthenticated, item.addItem);
    app.post('/api/updateitem', auth.ensureAuthenticated, item.updateItem);
    //Order
    app.get('/api/orders', order.orders);
    app.post('/api/addorder', order.addOrder);
    //Menu
    app.get('/api/menus', menu.menus);
    app.get('/api/removeMenu/:qkey/:qvalue', menu.removeMenu);
    app.post('/api/addmenu', menu.addMenu);
    app.post('/api/updateMenu', menu.updateMenu);
    //User
    app.get('/api/users', auth.ensureAuthenticated, user.users);
    app.post('/api/user', auth.ensureAuthenticated, user.addUser);
    //Upload File
    app.post('/api/upload', api.uploadFile);
    //Auth
    app.post('/login', function (req, res, next) {
        passport.authenticate('local-login', {
            session: false
        }, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).send({
                    message: req.flash('loginMessage')
                });
            }
            // req.logIn(user, function (err) {
            //     if (err) {
            //         return res.status(401).send({
            //             message: req.flash('loginMessage')
            //         });
            //     }
            res.send({
                token: auth.createJWT(user),
                user: user
            });
            // });
        })(req, res, next);
    });

    app.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', {
            session: false
        }, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(409).send({
                    message: req.flash('signupMessage')
                });
            }
            // req.logIn(user, function (err) {
            //     if (err) {
            //         return res.status(401).send({
            //             message: req.flash('loginMessage')
            //         });
            //     }
            res.send({
                token: auth.createJWT(user),
                user: user
            });
            // });
        })(req, res, next);
    });
    // app.post('/facebook', function (req, res, next) {
    //     passport.authenticate('facebook', {
    //         session: false
    //     }, function (err, user, info) {
    //         if (err) {
    //             return next(err);
    //         }
    //         // req.logIn(user, function (err) {
    //         //     if (err) {
    //         //         return res.status(401).send({
    //         //             message: req.flash('loginMessage')
    //         //         });
    //         //     }
    //         res.send({
    //             token: auth.createJWT(user),
    //             user: user
    //         });
    //         // });
    //     })(req, res, next);
    // });
    /*
 |--------------------------------------------------------------------------
 | Login with Facebook
 |--------------------------------------------------------------------------
 */
    app.post('/facebook', function (req, res) {
        var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
        var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
        var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: config.facebookAuth.clientSecret,
            redirect_uri: req.body.redirectUri
        };

        // Step 1. Exchange authorization code for access token.
        request.get({
            url: accessTokenUrl,
            qs: params,
            json: true
        }, function (err, response, accessToken) {
            console.log(err);
            if (response.statusCode !== 200) {
                return res.status(500).send({
                    message: accessToken.error.message
                });
            }

            // Step 2. Retrieve profile information about the current user.
            request.get({
                url: graphApiUrl,
                qs: accessToken,
                json: true
            }, function (err, response, profile) {
                if (response.statusCode !== 200) {
                    return res.status(500).send({
                        message: profile.error.message
                    });
                }
                console.log(profile);
                if (req.headers.authorization) {
                    User.findOne({
                        facebook: profile.id
                    }, function (err, existingUser) {
                        if (existingUser) {
                            return res.status(409).send({
                                message: 'There is already a Facebook account that belongs to you'
                            });
                        }
                        var token = req.headers.authorization.split(' ')[1];
                        var payload = jwt.decode(token, config.token_secret);
                        User.findById(payload.sub, function (err, user) {
                            if (!user) {
                                return res.status(400).send({
                                    message: 'User not found'
                                });
                            }
                            user.facebook = profile.id;
                            user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
                            user.displayName = user.displayName || profile.name;
                            user.save(function () {
                                var token = auth.createJWT(user);
                                res.send({
                                    token: token,
                                    user: user
                                });
                            });
                        });
                    });
                } else {
                    // Step 3b. Create a new user account or return an existing one.
                    User.findOne({
                        facebook: profile.id
                    }, function (err, existingUser) {
                        if (existingUser) {
                            var token = auth.createJWT(existingUser);
                            return res.send({
                                token: token,
                                user: existingUser
                            });
                        }
                        var user = new User();
                        user.facebook = profile.id;
                        user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                        user.displayName = profile.name;
                        user.save(function () {
                            var token = auth.createJWT(user);
                            res.send({
                                token: token,
                                user: user
                            });
                        });
                    });
                }
            });
        });
    });

    //logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // All undefined api routes should return a 404
    app.get('/api/*', function (req, res) {
        res.send(404);
    });

    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', index.index);
};
