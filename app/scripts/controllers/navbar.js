'use strict';

angular.module('todoApp')
    .controller('NavbarCtrl', function ($scope, $location) {
        $scope.menu = [{
            'title': 'Home',
            'link': '/'
    }, {
            'title': 'Items',
            'link': '/items'
    }, {
            'title': 'Contact',
            'link': '/contact'
    }, {
            'title': 'About',
            'link': '/about'
    }];
        $scope.isActive = function (route) {
            console.log('route: ' + route + 'path:' + $location.path());
            return route === $location.path();
        };
    });