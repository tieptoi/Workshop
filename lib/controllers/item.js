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
        }
        return res.send(err);
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
        if (!err && item !== null) {
            return res.json(item);
        } else if (item === null) {
            return res.send("Item was not existed");
        }
        return res.send(err);
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
        quantity: req.body.quantity,
        views: req.body.views,
        canPurchase: req.body.canPurchase
    });

    item.save(function (err) {
        if (!err) {
            return res.send("Item is created");
        }
        return res.send(err);
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
        quantity: req.body.quantity,
        views: req.body.views,
        canPurchase: req.body.canPurchase
    });

    Item.findOne({
        name: item.name
    }, function (err, i) {
        if (!err && i !== null) {
            i.description = item.description;
            i.image = item.image;
            i.name = item.name;
            i.price = item.price;
            i.quantity = item.quantity;
            i.views = item.views;
            i.canPurchase = item.canPurchase;
            i.save(function (err) {
                if (!err) {
                    return res.send("Item is updated");
                }
                return res.send(err);
            });
        } else if (i === null) {
            return res.send("Item was not existed");
        }
        return res.send(err);
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
        if (!err && item !== null) {
            item.remove(function (err) {
                if (!err) {
                    return res.send("Item is removed");
                }
                return res.send(err);
            });
        } else if (item === null) {
            return res.send("Item was not existed");
        }
        return res.send(err);
    });
};
