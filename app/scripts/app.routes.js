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
            .when('/contact', {
                templateUrl: 'partials/shared/contact'
                    // controller: 'LoginController'
            })
            .when('/about', {
                templateUrl: 'partials/shared/about'
                    // controller: 'LoginController'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }).factory('authHttpResponseInterceptor', ['$q', '$location', function ($q, $location) {
        return {
            response: function (response) {
                if (response.status === 401) {
                    console.log("Response 401");
                }
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    console.log("Response Error 401", rejection);
                    $location.absUrl('/login');
                }
                return $q.reject(rejection);
            }
        }
    }])
    .config(['$httpProvider', function ($httpProvider) {
        //Http Intercpetor to check auth failures for xhr requests
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
    }]);
