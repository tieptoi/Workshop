'use strict';

angular.module('todoApp')
    .controller('ItemController', ['$scope', '$filter', '$uibModal', 'Item', ItemController])
    .controller('ModalItemController', ['$scope', '$uibModalInstance', '$location', 'Item', 'item', ModalItemController])
    .controller('CreateItemController', ['$scope', '$location', 'Item', 'FileUploader', '$routeParams', '$auth', CreateItemController]);

function ItemController($scope, $filter, $uibModal, Item) {
    /// Properties===============
    $scope.items = [];
    $scope.tab = 1;
    $scope.sortOrder = '';
    $scope.currentPage = 1;
    $scope.pageSize = 8;
    $scope.totalItems = 0;
    $scope.animationsEnabled = true;
    $scope.modalSize = 'md';

    /// Init=====================
    Item.getItemsByPages($scope.currentPage, $scope.pageSize, 'name')
        .success(function (response) {
            //console.error(response);
            $scope.items = response;
            angular.forEach($scope.items, function (item) {
                item.orderQuantity = 1;
            });
        }).error(function (response) {
            console.log(response);
        });
    Item.getNoOfItems()
        .success(function (response) {
            $scope.totalItems = response;
        }).error(function (response) {
            console.log(response);
        });
    /// METHODS=====================

    /*Open Modal*/
    $scope.open = function (item) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'template/itemModalView.html',
            controller: 'ModalItemController',
            size: $scope.modalSize,
            resolve: {
                item: function () {
                    return item;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            //Update Views for item
            selectedItem.views = selectedItem.views + 1;
            Item.updateItem(selectedItem).success(function (response) {
                console.log(response);
            }).error(function (response) {
                console.log(response);
            });
        }, function () {
            console.info('Modal dismissed at: ' + new Date());
        });
    };

    /* Get Price(if item on sale)*/
    $scope.getPrice = function (item) {
        //console.log(item);
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


    /* Sort List of Items according to user's selection.*/
    $scope.sortChange = function () {
        if ($scope.sortOrder !== '') {
            $scope.items = $scope.sort($scope.items);
        }
    };
    /*Sort fnct*/
    $scope.sort = function (items) {
        if ($scope.sortOrder !== '') {
            return $filter('orderBy')(items, $scope.sortOrder.split('-')[0], $scope.sortOrder.split('-')[1] === 'desc' ? true : false);
        }
        return items;
    };
    /*  Add item to cart */
    $scope.add = function (item) {
        //item.orderQuantity = 1;
        $scope.$emit('add2Cart', item);
    };

    /* When page change occured */
    $scope.pageChangeHandler = function (newPageNumber) {
        Item.getItemsByPages(newPageNumber, $scope.pageSize, 'name')
            .success(function (response) {
                //console.error(response);
                $scope.items = $scope.sort(response);
                angular.forEach($scope.items, function (item) {
                    item.orderQuantity = 1;
                });
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
};

function ModalItemController($scope, $uibModalInstance, $location, Item, item) {
    /*INIT*/
    $scope.item = item;

    /// METHODS=====================
    /*Close Modal with passing a result*/
    $scope.ok = function () {
        $uibModalInstance.close($scope.item);
    };

    /*Close Modal with passing a result*/
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

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
            $uibModalInstance.close($scope.item);
            $scope.$emit('add2Cart', item);
        }
    };

    /*  Edit item infor */
    $scope.edit = function (item) {
        $uibModalInstance.close($scope.item);
        $location.path('/item/edit/id/' + item._id);
    };
};

function CreateItemController($scope, $location, Item, FileUploader, $routeParams, $auth) {
    /*Init*/
    $scope.header = '';
    $scope.id = $routeParams.qvalue;
    //$scope.item = {};
    //$scope.item.name = '';
    //$scope.item.category = '';
    //$scope.item.issale = true;
    var uploader = $scope.uploader = new FileUploader({
        url: '/api/upload',
        queueLimit: 5,
        filters: [{
            name: 'photoType',
            // A user-defined filter
            fn: function (item) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        }, {
            name: 'isDuplicate',
            // A user-defined filter
            fn: function (item) {
                var flag = true;
                angular.forEach(uploader.queue, function (queue, key) {
                    if (queue._file.name === item.name && queue._file.size === item.size) {
                        flag = true;
                    }
                });
                return flag;
            }
        }]
    });

    /*Method*/
    (function () {
        if ($scope.id && $scope.id !== '') {
            Item.getItemByID($scope.id)
                .then(function (resp) {
                    //assigne item to scope
                    $scope.item = resp;
                    //get uploaded image file
                    Item.getImages(resp.image)
                        .success(function (data, status, headers, config) {
                            var file = new File([data], resp.image, {
                                type: data.type
                            });
                            //console.log(data.type);
                            uploader.addToQueue(file);
                            uploader.queue[0].upload();
                        });
                },function (err) {
                    console.error(err);
                });
        } else {
            $scope.item = {};
        }
        var path = $location.path().split('/');
        //console.log(path.indexOf('edit'));
        if (path && path.indexOf('edit') > -1) {
            $scope.header = 'Edit Item';
        } else {
            $scope.header = 'Create Item';
        }
    })();

    uploader.onAfterAddingFile = function (item) {
        //console.log(item);
        console.log(uploader.queue[0].file.name);
        console.log($scope.item);
        $scope.item.image = item.file.name;
    };


    uploader.onWhenAddingFileFailed = function (item, filter, options) {
        console.log(item);
        console.log(filter);
        console.log(options);
    };
    $scope.submitForm = function (isValid) {
        //console.log($scope.item);
        //Show alert message
        if (isValid && $auth.isAuthenticated())
            swal({
                title: 'Are you sure?',
                text: 'You will not be able to recover this item!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#A5DC86',
                confirmButtonText: 'Yes, save it!',
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            }, function () {
                setTimeout(function () {
                    var submit;
                    if ($scope.header && $scope.header === 'Edit Item') {
                        submit = Item.updateItem($scope.item);
                    } else {
                        submit = Item.addItem($scope.item);
                    }
                    //
                    submit.success(function (res) {
                        swal({
                            title: 'Saved!',
                            text: 'Your item has been updated successfully.',
                            type: 'success',
                            timer: 1000,
                            showConfirmButton: false
                                // }, function () {
                                //     console.log('test');
                                //$location.path('/');
                                //$scope.$apply();
                        });
                        console.log(res);
                    }).error(function (err) {
                        swal({
                            title: 'Failed!',
                            text: 'You dont have permission to update this item.',
                            type: 'error',
                            timer: 1000,
                            showConfirmButton: false
                        });
                        console.error(err);
                    });
                }, 2000);
            });
    };
};