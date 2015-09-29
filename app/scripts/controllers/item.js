'use strict';

angular.module('todoApp')
    .controller('ItemCtrl', function ($scope, $log, ItemService) {
        /// Properties===============
        $scope.items = [];
        $scope.item = {};
        $scope.master = {};
        $scope.cart = {
            items: [],
            total: 0
        };

        /// Init=====================
        function init() {
            ItemService.getItems()
                .success(function (response) {
                    $scope.items = response;
                    angular.forEach($scope.items, function (item) {
                        item.orderQuantity = 1;
                    });
                }).error(function (response) {
                    console.log(response);
                });
        }

        init();

        /* View Item Detail in Modal*/
        $scope.viewDetail = function (item) {
            $scope.item = item;
            $scope.master = angular.copy($scope.item);
        };

        /* Check There are any item in cart */
        $scope.anyItem = function () {
            var flag = ($scope.cart.items.length > 0) ? true : false;
            return flag;
        };

        /*  Add item to cart */
        $scope.add = function (item, form) {
            if (form.$valid) {
                //Check duplicate item in cart
                console.log(form.$valid);
                var dup = false;
                angular.forEach($scope.cart.items, function (i) {
                    if (i.name === item.name) {
                        dup = true;
                        console.log(i.orderQuantity);
                        i.orderQuantity = i.orderQuantity + item.orderQuantity;
                    }
                });
                if (!dup) {
                    $log.info(item);
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
                }
                $scope.changeQuantity();
            } else {
                angular.copy($scope.master, $scope.item);
            }
        };

        /* Remove item in cart */
        $scope.remove = function (item) {
            if (item.orderQuantity > 0) {
                $scope.cart.total = $scope.cart.total - (item.orderQuantity * item.price)
            }
            $scope.cart.items.splice($scope.cart.items.indexOf(item), 1);
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

    });