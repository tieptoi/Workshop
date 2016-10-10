'use strict';

angular.module('todoApp')
    .service('Thing', function Service($http) {
        return {
            // AngularJS will instantiate a singleton by calling "new" on this function
            getThings: function () {
                return $http.get('/api/awesomeThings');
            },
            getThing: function (id) {
                return $http.get('/api/awesomeThing/' + id);
            },
            addThing: function (thing) {
                return $http.post('/api/addThing', JSON.stringify(thing));
            }
        };
    });