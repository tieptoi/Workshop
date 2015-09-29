'use strict';

angular.module('todoApp')
    .controller('ItemCtrl', function ($scope, $log, ItemService) {
        /// Properties===============
        $scope.items = [];
        $scope.item = {};
        $scope.master = {};

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

        /*  Add item to cart */
        $scope.add = function (item, form) {
            $scope.$emit('add2Cart', item, form);
        };

    });