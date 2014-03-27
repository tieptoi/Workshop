'use strict';

angular.module('todoApp')
  .directive('directive', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the directive directive');
      }
    };
  });
