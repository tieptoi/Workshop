'use strict';

var mongoose = require('mongoose'),
    Menu = mongoose.model('Menu');
/**
 * Get all menus
 */

exports.menus = function (req, res) {
    return Menu.find(function (err, menus) {
        if (!err) {
            return res.json(menus);
        } else {
            return res.send(err);
        }
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
        submenus: req.body.submenus,
        sortorder: req.body.sortorder
    });

    menu.save(function (err) {
        if (!err) {
            return res.send("Menu is created");
        } else {
            //TODO: return page with errors
            return res.send(err);
        }
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
        submenus: submenus,
        sortorder: req.body.sortorder
    });

    Menu.findOne({
        title: menu.title
    }, function (err, i) {
        if (!err) {
            if (i === null) return res.send("Menu was not existed");
            i.title = menu.title;
            i.link = menu.link;
            i.submenus = menu.submenus;
            i.sortorder = menu.sortorder;
            i.save(function (err) {
                if (!err) {
                    return res.send("Menu is updated");
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
 * Remove menu
 */

exports.removeMenu = function (req, res) {
    //var key = req.params.qkey;
    var value = req.params.qvalue;
    return Menu.findOne({
        'title': value
    }, function (err, menu) {
        if (!err) {
            if (menu === null) return res.send("Menu was not existed");
            menu.remove(function (err) {
                if (!err) {
                    return res.send("Menu is removed");
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