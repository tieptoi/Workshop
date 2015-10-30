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

        /*Satellizer Config*/
        $authProvider.loginUrl = '/login';
        $authProvider.signupUrl = '/signup';
        $authProvider.unlinkUrl = '/logout/';

        function skipIfLoggedIn($q, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
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
            $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        }
    });
// .config(['$httpProvider', function ($httpProvider) {
//     //Http Intercpetor to check auth failures for xhr requests
//     $httpProvider.interceptors.push('authHttpResponseInterceptor');
// }])

// .factory('authHttpResponseInterceptor', ['$q', '$location', function ($q, $location) {
//         return {
//             response: function (response) {
//                 if (response.status === 401) {
//                     console.log("Response 401");
//                 }
//                 return response || $q.when(response);
//             },
//             responseError: function (rejection) {
//                 if (rejection.status === 401) {
//                     console.log("Response Error 401", rejection);
//                     $location.absUrl('/login');
//                 }
//                 return $q.reject(rejection);
//             }
//         }
//     }])
