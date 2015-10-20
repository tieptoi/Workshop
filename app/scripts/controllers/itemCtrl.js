'use strict';

angular.module('itemCtrl', ['itemService', 'angularUtils.directives.dirPagination', 'ngMessages', 'angularFileUpload'])
    .controller('ItemController', function ($scope, $filter, Item) {
        /// Properties===============
        $scope.items = [];
        $scope.tab = 1;
        $scope.sortOrder = '';
        $scope.currentPage = 1;
        $scope.pageSize = 8;
        $scope.totalItems = 0;
        /// Init=====================
        // Item.getItems()
        //     .success(function (response) {
        //         $scope.items = response;
        //         angular.forEach($scope.items, function (item) {
        //             item.orderQuantity = 1;
        //         });
        //     }).error(function (response) {
        //         console.log(response);
        //     });
        Item.getItemsByPages($scope.currentPage, $scope.pageSize, 'name')
            .success(function (response) {
                //console.error(response);
                $scope.items = response;
            }).error(function (response) {
                console.log(response);
            });
        Item.getNoOfItems()
            .success(function (response) {
                $scope.totalItems = response;
            }).error(function (response) {
                console.log(response);
            });



        /* View Item Detail in Modal*/
        $scope.viewDetail = function (item) {
            $scope.$emit('viewItemDetail', item);
        };

        /* Get Price(if item on sale)*/
        $scope.getPrice = function (item) {
            if (item.isSale) {
                return (item.price - (item.price * (item.discountPct / 100)));
            }
            return item.price;
        };
        // /* Check which page is selcted*/
        // $scope.isCurrnetPage = function (pageNo) {
        //     return pageNo === $scope.currentPage;
        // };

        // /* Set Current selected page*/
        // $scope.setPage = function (pageNo) {
        //     $scope.currentPage = pageNo;
        // };


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

        /* When page change occured */
        $scope.pageChangeHandler = function (newPageNumber) {
            Item.getItemsByPages(newPageNumber, $scope.pageSize, 'name')
                .success(function (response) {
                    //console.error(response);
                    $scope.items = response;
                }).error(function (response) {
                    console.log(response);
                });
        };

        /* When choose number of item per page */
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
    })
    .controller('CreateItemController', function ($scope, Item, FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: "/api/upload",
            queueLimit: 5
        });
        $scope.item = {};
        $scope.item.name = "";
        $scope.item.category = "";
        $scope.item.issale = true;

        //Adding Filter for upload control
        uploader.filters.push({
            name: 'photoType',
            // A user-defined filter
            fn: function (item) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        uploader.filters.push({
            name: 'isDuplicate',
            // A user-defined filter
            fn: function (item) {
                for (var i = 0; i < uploader.queue.length; i++) {
                    if (uploader.queue[i]._file.name === item.name && uploader.queue[i]._file.size === item.size) return false;
                }
                return true;
            }
        });

        uploader.onAfterAddingFile = function (item) {
            // console.log(item);
        };
        uploader.onWhenAddingFileFailed = function (item, filter, options) {
            console.log(item);
            console.log(filter);
            console.log(options);
        };
        $scope.submitForm = function (isValid) {
            console.log("test " + isValid);
        };
    });
