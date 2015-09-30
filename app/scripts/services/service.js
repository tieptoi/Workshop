'use strict';

angular.module('thingService', [])
    .service('Thing', function Service($http) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        this.getThings = function () {
            return $http.get('/api/awesomeThings');
        };
        this.getThing = function (id) {
            return $http.get('/api/awesomeThing/' + id);
        };
        this.addThing = function (thing) {
            return $http.post('/api/addThing', JSON.stringify(thing));
        };
    });