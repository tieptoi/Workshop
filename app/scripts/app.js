'use strict';

angular.module('todoApp', ['angularUtils.directives.dirPagination', 'ngRoute', 'satellizer', 'toastr', 'ngAnimate', 'ui.bootstrap', 'ngMessages', 'angularFileUpload', 'app.routes', 'ngCookies'])
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
