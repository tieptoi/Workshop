'use strict';

angular.module('app.routes', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/shared/mainView',
                controller: 'MainController'
            })
            .when('/item', {
                templateUrl: 'partials/item/itemsView',
                controller: 'ItemController'
            })
            .when('/item/create', {
                templateUrl: 'partials/item/createItemView',
                controller: 'CreateItemController'
            })
            .when('/item/edit/:qkey/:qvalue', {
                templateUrl: 'partials/item/createItemView',
                controller: 'CreateItemController'
            })
            .when('/login', {
                templateUrl: 'partials/auth/login',
                controller: 'LoginController'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    });
