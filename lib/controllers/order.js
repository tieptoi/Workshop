'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
  Order = mongoose.model('Order'),
  Item = mongoose.model('Item');

// /**
//  * Get item
//  */

function findOneByName(name) {
  //var key = req.params.qkey;
  //var value = req.params.qvalue;
  Item.findOne({
    'name': name
  }, function (err, item) {
    if (!err) {
      return item;
    } else {
      return null;
    }
  });
}

/**
 * Get orders
 */

exports.orders = function (req, res) {
  return Order.find(function (err, orders) {
    if (!err) {
      return res.json(orders);
    } else {
      return res.send(err);
    }
  });
};

// /**
//  * Add item
//  */

exports.addorder = function (req, res) {
  var order;

  order = new Order({
    orderdetails: req.body.orderdetails,
    date: req.body.date
  });

  order.save(function (err) {
    if (!err) {
      var flag = false;
      var listofItems = [];
      async.each(order.orderdetails, function (orderdetail, callback) {
        Item.findOne({
          'name': orderdetail.item.name
        }, function (error, item) {
          if (!error) {
            if (item.quantity < orderdetail.orderquantity) {
              flag = true;
            }
            item.quantity = item.quantity - orderdetail.orderquantity;
            listofItems.push(item);
            // After Finish Let Async Know
            callback();
          } else {
            flag = true;
            callback(error);
          }
          return;
        });
      }, function (ee) {
        // All tasks are done now
        if (flag) {
          return res.send(400,"Out of order");
        } else if (ee) {
          return res.send(err);
        } else {
          async.each(
            // 1st parameter is array
            listofItems,
            // 2rd parameter is iterator
            function (item, callback) {
              // Call an asynchronous function (often a save() to MongoDB)
              item.save(function (ex) {
                if (!ex) {
                  // Async call is done, alert via callback
                  callback();
                } else {
                  // Async call is done, alert via callback
                  callback(ex);
                }
              });
              return;
            },
            // 3rd parameter is the function call when everything is done
            function (e) {
              // All tasks are done now
              if (!e) {
                return res.send("Order is created");
              } else {
                return res.send(409);
              }
            });
        }
      });
    } else {
      //TODO: return page with errors
      return res.send(err);
    }
  });
};

// /**
//  * Add item
//  */

// exports.addItem = function (req, res) {
//   var item;

//   item = new Item({
//     description: req.body.description,
//     image: req.body.image,
//     name: req.body.name,
//     price: req.body.price,
//     quantity: req.body.quantity
//   });

//   item.save(function (err) {
//     if (!err) {
//       console.log("created");
//       return res.send("Item is created");
//     } else {
//       //TODO: return page with errors
//       console.log(err);
//       return res.send(err);
//     }
//   });
// };

// /**
//  * Update item
//  */

// exports.updateItem = function (req, res) {
//   var item;

//   item = new Item({
//     description: req.body.description,
//     image: req.body.image,
//     name: req.body.name,
//     price: req.body.price,
//     quantity: req.body.quantity
//   });

//   Item.findOne({name : item.name}, function (err, i) {
//     if (!err) {
//       i.description = item.description;
//       i.image = item.image;
//       i.name = item.name;
//       i.price = item.price;
//       i.quantity = item.quantity;
//       i.save(function (err) {
//         if (!err) {
//           return res.send("Item is updated");
//         } else {
//           //TODO: return page with errors
//           return res.send(err);
//         }
//       });
//     } else {
//       //TODO: return page with errors
//       console.log(err);
//       return res.send(err);
//     }
//   });
// };