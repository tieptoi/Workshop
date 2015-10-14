'use strict';

angular.module('app.routes', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/shared/mainView',
                controller: 'MainController'
            })
            .when('/items', {
                templateUrl: 'partials/item/itemsView',
                controller: 'ItemController'
            })
            .when('/item/create', {
                templateUrl: 'partials/item/createItemView',
                controller: 'CreateItemController'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    });
