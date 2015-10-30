'use strict';

angular.module('todoApp')
    .controller('MainController', function ($scope, $auth, Thing) {
        $scope.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };
        //var thing = { name : 'HTML5 Boilerplate',
        //              info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
        //              awesomeness: 10};
        //var id = '532dc164f2fef978160642ce';

        // Get All Things 
        /*Thing.getThings().success(function (awesomeThings) {
            $scope.awesomeThings = awesomeThings;
        })*/
        ;
        // Get One Thing
        //Service.addThing(thing).success(function (response) {
        //  console.log(response);
        //});
        // Add one Thing
        /* Thing.getThing(id).success(function (awesomeThing) {
             console.log(awesomeThing);
         }).error(function (response) {
             console.log(response);
         });*/

    });
