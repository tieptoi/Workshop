'use strict';

var api = require('./controllers/api'),
    item = require('./controllers/item'),
    order = require('./controllers/order'),
    menu = require('./controllers/menu'),
    auth = require('./controllers/auth'),
    user = require('./controllers/user'),
    index = require('./controllers/index'),
    flash = require('connect-flash'),
    config = require('./config/config');

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
                return res.status(401).send({
                    message: req.flash('loginMessage')
                });
            }
            if (!user) {
                return res.status(401).send({
                    message: req.flash('loginMessage')
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.status(401).send({
                        message: req.flash('loginMessage')
                    });
                }
                res.send({
                    token: auth.createJWT(user),
                    user: user
                });
                //return res.redirect('/');
            });
        })(req, res, next);
    });
    // process the sigup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/item', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
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
