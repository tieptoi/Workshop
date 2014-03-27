'use strict';

angular.module('todoApp')
  .service('ItemService', function Service($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    //GET============================
    this.getItems = function () {
      return $http.get('/api/items');
    };

    //CREATE ==========================

    //Update ==========================

    //Delete ==========================
    //this.getThing = function (id) {
    //  return $http.get('/api/awesomeThing/' + id);
    //};
    //this.addThing = function (thing) {
    //  return $http.post('/api/addThing', JSON.stringify(thing));
    //};
  });

