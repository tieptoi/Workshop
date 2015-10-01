'use strict';

angular.module('todoApp', ['app.routes', 'ItemCtrl', 'MainCtrl', 'NavbarCtrl', 'ngResource', 'thingService', 'itemService'])
    .config(['$provide', function ($provide) {
        $provide.decorator('$rootScope', ['$delegate', function ($delegate) {
            Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
                value: function (name, listener) {
                    var unsubscribe = $delegate.$on(name, listener);
                    this.$on('$destroy', unsubscribe);

                    return unsubscribe;
                },
                enumerable: false
            });
            return $delegate;
        }]);
    }]);
