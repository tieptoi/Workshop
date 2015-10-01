'use strict';

angular.module('app.routes', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/mainView',
                controller: 'MainController'
            })
            .when('/items', {
                templateUrl: 'partials/itemsView',
                controller: 'ItemController'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    });
