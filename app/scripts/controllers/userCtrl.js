'use strict';

angular.module('todoApp')
    .controller('LoginController', ['$scope', '$auth', '$window', '$rootScope', '$location', 'toastr', LoginController])
    .controller('SignUpController', ['$scope', '$auth', '$window', '$rootScope', '$location', 'toastr', SignUpController]);

function LoginController($scope, $auth, $window, $rootScope, $location, toastr) {
    $scope.login = function () {
        $auth.login($scope.user)
            .then(function (res) {
                $window.localStorage.currentUser = JSON.stringify(res.data.user);
                $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                toastr.success('You have successfully signed in');
                $location.path('/');
            })
            .catch(function (res) {
                toastr.error(res.data.message, res.status);
            });
    };
    $scope.authenticate = function (provider) {
        $auth.authenticate(provider)
            .then(function (res) {
                $auth.setToken(res.data.token);
                $window.localStorage.currentUser = JSON.stringify(res.data.user);
                $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                toastr.success('You have successfully signed in with ' + provider);
                $location.path('/');
            })
            .catch(function (response) {
                console.log(response);
                toastr.error(response.data.message);
            });
    };
};

function SignUpController($scope, $auth, $window, $rootScope, $location, toastr) {
    $scope.signup = function () {
        console.log($scope.user);
        $auth.signup($scope.user)
            .then(function (res) {
                $auth.setToken(res.data.token);
                $window.localStorage.currentUser = JSON.stringify(res.data.user);
                $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                toastr.info('You have successfully created a new account and have been signed-in');
                $location.path('/');
            })
            .catch(function (res) {
                toastr.error(res.data.message);
            });
    };

};