// 'use strict';

// angular.module('todoApp')
//     .directive('itemNameAvailableValidator', function ($http) {
//         return {
//             require: 'ngModel',
//             link: function ($scope, element, attrs, ngModel) {
//                 ngModel.$asyncValidators.itemNameAvailable = function (itemname) {
//                     return $http.get('/api/item/name/' + itemname);
//                 };
//             }
//         };
//     });
