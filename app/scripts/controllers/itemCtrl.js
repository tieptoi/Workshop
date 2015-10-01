'use strict';

angular.module('ItemCtrl', ['itemService'])
    .controller('ItemController', function ($scope, $filter, Item) {
        /// Properties===============
        $scope.tab = 1;
        $scope.sortOrder = 'price-asc';

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

        $scope.sortChange = function () {
            $scope.items = $filter('orderBy')($scope.items, $scope.sortOrder.split('-')[0], $scope.sortOrder.split('-')[1] === 'desc' ? true : false);
        };

        /* View Item Detail in Modal*/
        $scope.viewDetail = function (item) {
            $scope.item = item;
            item.views = item.views + 1;
            console.log(item);
            Item.updateItem(item).success(function (response) {
                console.log(response);
            }).error(function (response) {
                console.log(response);
            });
            //$scope.master = angular.copy($scope.item);
        };

        /*  Add item to cart */
        $scope.add = function (item, form) {
            $scope.$emit('add2Cart', item, form);
        };

    });
