'use strict';

angular.module('itemCtrl', ['itemService', 'angularUtils.directives.dirPagination'])
    .controller('ItemController', function ($scope, $filter, Item) {
        /// Properties===============
        $scope.tab = 1;
        $scope.sortOrder = '';
        $scope.currentPage = 1;
        $scope.pageSize = 8;
        $scope.totalItems = 0;
        /// Init=====================
        Item.getItems()
            .success(function (response) {
                $scope.items = response;
                angular.forEach($scope.items, function (item) {
                    item.orderQuantity = 1;
                });
                console.log(1);
            }).error(function (response) {
                console.log(response);
            });

        /* View Item Detail in Modal*/
        $scope.viewDetail = function (item) {
            $scope.$emit('viewItemDetail', item);

            //$scope.master = angular.copy($scope.item);
        };

        /* Get Price(if item on sale)*/
        $scope.getPrice = function (item) {
            if (item.isSale) {
                return (item.price - (item.price * (item.discountPct / 100)));
            }
            return item.price;
            //$scope.master = angular.copy($scope.item);
        };

        $scope.getListOfPages = function (noOfItemPerPage) {
            var noOfPages = Math.round($scope.items.length / noOfItemPerPage);
            var pages = [];
            var no = 1;
            for (no = 1; no < noOfPages; no++) {
                pages.push(no);
            }
            return pages;
        };
        /* Check which page is selcted*/
        $scope.isCurrnetPage = function (pageNo) {
            return pageNo === $scope.currentPage;
        };

        /* Set Current selected page*/
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        //Sort List of Items according to user's selection.
        $scope.sortChange = function () {
            if ($scope.sortOrder !== '') {
                $scope.items = $filter('orderBy')($scope.items, $scope.sortOrder.split('-')[0], $scope.sortOrder.split('-')[1] === 'desc' ? true : false);
            }
        };
        /*  Add item to cart */
        $scope.add = function (item) {
            item.orderQuantity = 1;
            $scope.$emit('add2Cart', item);
        };
        $scope.pageChangeHandler = function (newPageNumber) {
            console.log("page number " + newPageNumber);
        };
        $scope.perPageChange = function () {
            if ($scope._pageSize !== '') {
                $scope.pageSize = $scope._pageSize;
            } else if ($scope._pageSize !== '') {
                $scope.pageSize = $scope.items.length;
            }
            $scope.currentPage = 1;
        };
    })
    .controller('ModalItemController', function ($scope, Item) {
        /* Open Item Detail in Modal*/
        $scope.$onRootScope('viewItemDetail', function (event, item) {
            item.views = item.views + 1;
            Item.updateItem(item).success(function (response) {
                console.log(response);
            }).error(function (response) {
                console.log(response);
            });

            $scope.item = item;
        });
        /* Check which tab is selcted in Item Detail Modal*/
        $scope.isSelected = function (tabName) {
            return tabName === $scope.tab;
        };
        /* Event hanppend when user select a tab in Item Detail Modal*/
        $scope.selectTab = function (tabName) {
            $scope.tab = tabName;
        };
        /*  Add item to cart */
        $scope.add = function (item, form) {
            if (form.$valid) {
                $('#modal').modal('hide');
                $scope.$emit('add2Cart', item);
            }
        };
    });
