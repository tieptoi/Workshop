'use strict';

angular.module('app.routes', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider, $authProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/shared/main',
                controller: 'MainController'
            })
            .when('/item', {
                templateUrl: 'partials/item/items',
                controller: 'ItemController'
            })
            .when('/item/create', {
                templateUrl: 'partials/item/createItem',
                controller: 'CreateItemController'
            })
            .when('/item/edit/:qkey/:qvalue', {
                templateUrl: 'partials/item/createItem',
                controller: 'CreateItemController',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .when('/login', {
                templateUrl: 'partials/auth/login',
                controller: 'LoginController',
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                }
            })
            .when('/signup', {
                templateUrl: 'partials/auth/signup',
                controller: 'SignUpController',
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                }
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

        /*Satellizer Config*/
        $authProvider.loginUrl = '/login';
        $authProvider.signupUrl = '/signup';
        $authProvider.unlinkUrl = '/logout/';
        $authProvider.facebook({
            url: '/facebook',
            clientId: '478091019019627'
        });
        /*Satellizer Methods*/
        function skipIfLoggedIn($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                //deferred.reject();
                $location.path('/');
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }

        function loginRequired($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/login');
            }
            return deferred.promise;
        }
        $locationProvider.html5Mode(true);
    }).run(function ($rootScope, $window, $auth) {
        if ($auth.isAuthenticated()) {
            if ($window.localStorage.currentUser && $window.localStorage.currentUser !== '') {
                $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
            } else {
                $auth.logout();
            }
        }
    });
