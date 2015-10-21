'use strict';

angular.module('todoApp')
    .service('Item', function Service($http) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        //GET============================
        this.getItems = function () {
            return $http.get('/api/items');
        };

        //GET No Of Items============================
        this.getNoOfItems = function () {
            return $http.get('/api/noOfItems');
        };
        //GET getItemsByPages============================
        this.getItemsByPages = function (pages, size, sort) {
            return $http.get('/api/items/pages/' + pages + '/size/' + size + '/sort/' + sort);
        };
        //GET No Of Items============================
        this.getNoOfItems = function () {
            return $http.get('/api/noOfItems');
        };

        //CREATE ==========================
        this.addItem = function (item) {
            return $http.post('/api/addItem', JSON.stringify(item));
        };
        //Update ==========================
        this.updateItem = function (item) {
            return $http.post('/api/updateItem', JSON.stringify(item));
        };
        //Delete ==========================
        //this.getThing = function (id) {
        //  return $http.get('/api/awesomeThing/' + id);
        //};
        //this.addThing = function (thing) {
        //  return $http.post('/api/addThing', JSON.stringify(thing));
        //};
    });
