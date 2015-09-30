'use strict';

angular.module('itemService', [])
    .service('Item', function Service($http) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        //GET============================
        this.getItems = function () {
            return $http.get('/api/items');
        };

        //CREATE ==========================
        this.addItem = function (item) {
            return $http.post('/api/addItem', JSON.stringify(thing));
        };
        //Update ==========================
        this.updateItem = function (item) {
            return $http.post('/api/updateItem', JSON.stringify(thing));
        };
        //Delete ==========================
        //this.getThing = function (id) {
        //  return $http.get('/api/awesomeThing/' + id);
        //};
        //this.addThing = function (thing) {
        //  return $http.post('/api/addThing', JSON.stringify(thing));
        //};
    });