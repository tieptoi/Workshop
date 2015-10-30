'use strict';

angular.module('todoApp').controller('LoginController', function ($scope, $auth, $window, $rootScope, $location, toastr) {
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

});
