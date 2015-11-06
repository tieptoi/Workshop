'use strict';

angular.module('todoApp')
    .directive('passwordMatch', function () {
        return {
            require: 'ngModel',
            scope: {
                otherModelValue: '=passwordMatch'
            },
            link: function ($scope, element, attrs, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    // console.log(ngModel);
                    // console.log(modelValue);
                    // console.log(modelValue === $scope.otherModelValue);
                    return modelValue === $scope.otherModelValue;
                };
                $scope.$watch('otherModelValue', function () {
                    ngModel.$validate();
                });
            }
        };
    });
