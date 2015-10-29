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
    app.post('/api/additem', auth.isAuthenticated, item.addItem);
    app.post('/api/updateitem', item.updateItem);
    //Order
    app.get('/api/orders', order.orders);
    app.post('/api/addorder', order.addOrder);
    //Menu
    app.get('/api/menus', menu.menus);
    app.get('/api/removeMenu/:qkey/:qvalue', menu.removeMenu);
    app.post('/api/addmenu', menu.addMenu);
    app.post('/api/updateMenu', menu.updateMenu);
    //User
    app.get('/api/users', auth.isAuthenticated, user.users);
    app.post('/api/user', auth.isAuthenticated, user.addUser);
    //Upload File
    app.post('/api/upload', api.uploadFile);
    //Auth
    //app.post('/auth/facebook', auth.loginFB);
    // process the login form
    // app.get('/login', function (req, res) {
    //     res.render('/login', {
    //         message: req.flash('loginMessage')
    //     });
    // });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/item', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // process the sigup form
    // app.get('/signup', function (req, res) {
    //     res.render('login.html', {
    //         message: req.flash('loginMessage')
    //     });
    // });
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
