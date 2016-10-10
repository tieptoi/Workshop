'use strict';

angular.module('todoApp')
    .service('Item', function Service($http, $q, $cacheFactory) {
        var cache = $cacheFactory('cacheId', {
            maxAge: 3600000 // items expire after an hour
        });
        // AngularJS will instantiate a singleton by calling "new" on this function
        return {
            //GET============================
            getItems: function () {
                return $http.get('/api/items');
            },
            //GET BY ID============================
            getItemByID: function (id) {
                var deferred = $q.defer();
                if (cache.get(id)) {
                    //console.log('Loading from Cache');
                    deferred.resolve(cache.get(id));
                    return deferred.promise;
                } else {
                    $http.get('/api/item/_id/' + id)
                        .success(function (resp) {
                            //console.log('Save to Cache');
                            cache.put(id, angular.isUndefined(resp) ? null : resp);
                            deferred.resolve(resp);
                        }).error(function (err) {
                            deferred.resolve(err);
                            //console.error(err);
                        });
                        console.log('Saved to Cache');
                        return deferred.promise;
                }
                //return $http.get('/api/item/_id/' + id);
            },
            //GET No Of Items============================
            getNoOfItems: function () {
                return $http.get('/api/noOfItems');
            },
            //GET getItemsByPages============================
            getItemsByPages: function (pages, size, sort) {
                //console.log('test');
                return $http.get('/api/items/pages/' + pages + '/size/' + size + '/sort/' + sort);
            },

            //CREATE ==========================
            addItem: function (item) {
                return $http.post('/api/addItem', JSON.stringify(item));
            },
            //Update ==========================
            updateItem: function (item) {
                 cache.put(item.id, angular.isUndefined(item) ? null : item);
                return $http.post('/api/updateItem', JSON.stringify(item));
            },
            //Update ==========================
            getImages: function (name) {
                var req = {
                    method: 'GET',
                    url: '/images/' + name,
                    responseType: 'blob'

                };

                return $http(req);
                //return $http.get('images/' + name);
            }
        };
    });