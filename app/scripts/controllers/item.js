'use strict';

angular.module('ItemCtrl', ['itemService'])
    .controller('ItemController', function ($scope, Item) {
        /// Properties===============
        $scope.tab = 1;
        //        $scope.items = [];
        //        $scope.item = {};
        //        $scope.master = {};

        /// Init=====================
        Item.getItems()
            .success(function (response) {
                $scope.items = response;
                angular.forEach($scope.items, function (item) {
                    item.orderQuantity = 1;
                });
            }).error(function (response) {
                console.log(response);
            });

        $scope.isSelected = function (tabName) {
            return tabName === $scope.tab;
        };

        $scope.selectTab = function (tabName) {
            $scope.tab = tabName;
        };


        /* View Item Detail in Modal*/
        $scope.viewDetail = function (item) {
            $scope.item = item;
            $scope.master = angular.copy($scope.item);
        };

        /*  Add item to cart */
        $scope.add = function (item, form) {
            $scope.$emit('add2Cart', item, form);
        };

    });
