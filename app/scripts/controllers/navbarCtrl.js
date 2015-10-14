'use strict';

angular.module('navbarCtrl', ['ngCookies'])
    .controller('NavbarController', function ($scope, $location) {

        $scope.menus = [{
            'title': 'Home',
            'link': '/'
        }, {
            'title': 'Items',
            'link': '/items',
            "submenus": [{
                "link": "/item/edit",
                "title": "Edit Item"
            }, {
                "link": "/item/create",
                "title": "Create Item"
            }],
        }, {
            'title': 'Contact Us',
            'link': '/contact'
        }, {
            'title': 'About Us',
            'link': '/about'
        }];

        $scope.isActive = function (route) {
            return route === $location.path();
        };

        $scope.hasSubMenu = function (menu) {
            return ((menu.submenus) && (menu.submenus.length > 0));
        };
    }).controller('CartController', function ($scope, $cookies) {
        //Define Properties
        $scope.cart = {
            items: [],
            total: 0
        };

        /* Add item to cart by listening on add2Cart event */
        $scope.$onRootScope('add2Cart', function (event, item) {
            //Check duplicate item in cart
            //console.log(form.$valid);
            var dup = false;
            angular.forEach($scope.cart.items, function (i) {
                if (i.name === item.name) {
                    dup = true;
                    i.orderQuantity = i.orderQuantity + item.orderQuantity;
                }
            });
            if (!dup) {
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
                //$cookies.putObject('cart', $scope.cart);
            }
            $scope.changeQuantity();
            //Show alert message
            swal({
                title: "Added to cart",
                text: "I will close in 1 seconds.",
                timer: 1000,
                showConfirmButton: false
            });
        });

        /* Remove item in cart */
        $scope.remove = function (item) {
            if (item.orderQuantity > 0) {
                $scope.cart.total = $scope.cart.total - (item.orderQuantity * item.price);
            }
            $scope.cart.items.splice($scope.cart.items.indexOf(item), 1);
            // Setting a cookie
            //$cookies.putObject('cart', $scope.cart);

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
        //Watch Cart if there are any changes
        $scope.$watch('cart', function (newValue, oldValue) {
            $cookies.putObject('cart', newValue);
        }, true);

        // Retrieving a cookie
        if ($cookies.getObject('cart') && $cookies.getObject('cart') !== null) {
            $scope.cart = $cookies.getObject('cart');
            $scope.changeQuantity();
        }
    });
