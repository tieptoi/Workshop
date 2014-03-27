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
      return route === $location.path();
    };
  });
