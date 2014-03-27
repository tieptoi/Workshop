'use strict';

var api = require('./controllers/api'),
  item = require('./controllers/item'),
  order = require('./controllers/order'),
  index = require('./controllers');

/**
 * Application routes
 */
module.exports = function (app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  app.get('/api/awesomeThing/:id', api.awesomeThing);
  app.post('/api/addThing', api.addThing);
  app.get('/api/items', item.items);
  app.get('/api/item/:qkey/:qvalue', item.item);
  app.post('/api/additem', item.addItem);
  app.post('/api/updateitem', item.updateItem);
  app.get('/api/orders', order.orders);
  app.post('/api/addorder', order.addorder);

  // All undefined api routes should return a 404
  app.get('/api/*', function (req, res) {
    res.send(404);
  });

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};