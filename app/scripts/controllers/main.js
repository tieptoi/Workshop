'use strict';

angular.module('todoApp')
  .controller('MainCtrl', function ($scope, Service) {
    //var thing = { name : 'HTML5 Boilerplate',
    //              info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
    //              awesomeness: 10};
    var id = '532dc164f2fef978160642ce';
    function init() {
      // Get All Things 
      Service.getThings().success(function (awesomeThings) {
        $scope.awesomeThings = awesomeThings;
        console.log(awesomeThings);
      });
      // Get One Thing
      //Service.addThing(thing).success(function (response) {
      //  console.log(response);
      //});
      // Add one Thing
      Service.getThing(id).success(function (awesomeThing) {
        console.log(awesomeThing);
      }).error(function (response) {
        console.log(response);
      });
    }
    init();

  });
