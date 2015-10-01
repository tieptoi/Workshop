'use strict';

var mongoose = require('mongoose'),
    Menu = mongoose.model('Menu');
/**
 * Get all menus
 */

exports.menus = function (req, res) {
    Menu.find(function (err, menus) {
        if (!err) {
            return res.json(menus);
        }
        return res.send(err);

    });
};

/**
 * Add Menu
 */

exports.addMenu = function (req, res) {
    var menu;
    menu = new Menu({
        title: req.body.title,
        link: req.body.link,
        subMenus: req.body.subMenus,
        sortOrder: req.body.sortOrder
    });

    menu.save(function (err) {
        if (!err) {
            return res.send("Menu is created");
        }
        return res.send(err);
    });
};
/**
 * Update Menu
 */

exports.updateMenu = function (req, res) {
    var menu;
    menu = new Menu({
        title: req.body.title,
        link: req.body.link,
        submMenus: req.body.subMenus,
        sortOrder: req.body.sortOrder
    });

    Menu.findOne({
        title: menu.title
    }, function (err, i) {
        if (!err && i !== null) {
            i.title = menu.title;
            i.link = menu.link;
            i.submMenus = menu.submMenus;
            i.sortOrder = menu.sortOrder;
            i.save(function (err) {
                if (!err) {
                    return res.send("Menu is updated");
                }
                return res.send(err);
            });
        } else if (i === null) {
            return res.send("Menu was not existed");
        }
        return res.send(err);
    });
};
/**
 * Remove menu
 */

exports.removeMenu = function (req, res) {
    //var key = req.params.qkey;
    var value = req.params.qvalue;
    return Menu.findOne({
        'title': value
    }, function (err, menu) {
        if (!err && menu !== null) {
            menu.remove(function (err) {
                if (!err) {
                    return res.send("Menu is removed");
                }
                return res.send(err);
            });
        } else if (menu === null) {
            return res.send("Menu was not existed");
        }
        return res.send(err);
    });
};
