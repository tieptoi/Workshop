'use strict';

angular.module('NavbarCtrl', ['ngCookies'])
    .controller('NavbarController', function ($scope, $cookies, $location) {
        //Define Properties
        $scope.cart = {
            items: [],
            total: 0
        };

        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        }, {
            'title': 'Items',
            'link': '/items'
        }, {
            'title': 'Contact',
            'link': '/contact'
        }, {
            'title': 'About',
            'link': '/about'
        }];
        $scope.isActive = function (route) {
            return route === $location.path();
        };

        /* Add item to cart by listening on add2Cart event */
        $scope.$onRootScope('add2Cart', function (event, item, form) {
            if (form.$valid) {
                //Check duplicate item in cart
                //console.log(form.$valid);
                var dup = false;
                angular.forEach($scope.cart.items, function (i) {
                    if (i.name === item.name) {
                        dup = true;
                        console.log(i.orderQuantity);
                        i.orderQuantity = i.orderQuantity + item.orderQuantity;
                    }
                });
                if (!dup) {
                    //$log.info(item);
                    /*Dont ever use this way to add item to array cause it link item in cart back to [$scope.item] */

                    //$scope.cart.items.push(item);

                    /* Instead use this way */
                    $scope.cart.items.push({
                        description: item.description,
                        image: item.image,
                        quantity: item.quantity,
                        name: item.name,
                        pid: item.pid,
                        price: item.price,
                        orderQuantity: item.orderQuantity
                    });

                    // Setting a cookie
                    $cookies.putObject('cart', $scope.cart);
                }
                $scope.changeQuantity();
            } else {
                angular.copy($scope.master, $scope.item);
            }
        });

        /* Remove item in cart */
        $scope.remove = function (item) {
            if (item.orderQuantity > 0) {
                $scope.cart.total = $scope.cart.total - (item.orderQuantity * item.price);
            }
            $scope.cart.items.splice($scope.cart.items.indexOf(item), 1);
            // Setting a cookie
            $cookies.putObject('cart', $scope.cart);

        };

        /* Change Cart Item Quantity */
        $scope.changeQuantity = function () {
            $scope.cart.total = 0;
            angular.forEach($scope.cart.items, function (item) {
                if (item.orderQuantity > 0) {
                    $scope.cart.total = $scope.cart.total + (item.orderQuantity * item.price);
                }
            });
        };


        // Retrieving a cookie
        if ($cookies.getObject('cart') && $cookies.getObject('cart') !== null) {
            $scope.cart = $cookies.getObject('cart');
            $scope.changeQuantity();
        }

    });
