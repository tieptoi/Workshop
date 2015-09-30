'use strict';

var mongoose = require('mongoose'),
    Item = mongoose.model('Item');

/**
 * Get items
 */

exports.items = function (req, res) {
    return Item.find(function (err, items) {
        if (!err) {
            return res.json(items);
        } else {
            return res.send(err);
        }
    });
};

/**
 * Get item
 */

exports.item = function (req, res) {
    //var key = req.params.qkey;
    var value = req.params.qvalue;
    return Item.findOne({
        'name': value
    }, function (err, item) {
        if (!err) {
            if (item === null) return res.send("Item was not existed");
            return res.json(item);
        } else {
            return res.send(err);
        }
    });
};

/**
 * Add item
 */

exports.addItem = function (req, res) {
    var item;
    item = new Item({
        description: req.body.description,
        image: req.body.image,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    });

    item.save(function (err) {
        if (!err) {
            return res.send("Item is created");
        } else {
            //TODO: return page with errors
            console.log(err);
            return res.send(err);
        }
    });
};


/**
 * Update item
 */

exports.updateItem = function (req, res) {
    var item;

    item = new Item({
        description: req.body.description,
        image: req.body.image,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    });

    Item.findOne({
        name: item.name
    }, function (err, i) {
        if (!err) {
            if (i === null) return res.send("Item was not existed");
            i.description = item.description;
            i.image = item.image;
            i.name = item.name;
            i.price = item.price;
            i.quantity = item.quantity;
            i.save(function (err) {
                if (!err) {
                    return res.send("Item is updated");
                } else {
                    //TODO: return page with errors
                    return res.send(err);
                }
            });
        } else {
            //TODO: return page with errors
            return res.send(err);
        }
    });
};
/**
 * Remove item
 */

exports.removeItem = function (req, res) {
    //var key = req.params.qkey;
    var value = req.params.qvalue;
    return Item.findOne({
        'name': value
    }, function (err, item) {
        if (!err) {
            if (item === null) return res.send("Item was not existed");
            item.remove(function (err) {
                if (!err) {
                    return res.send("Item is removed");
                } else {
                    //TODO: return page with errors
                    return res.send(err);
                }
            });
        } else {
            return res.send(err);
        }
    });
};