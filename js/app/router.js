define([
    'backbone'
], function (Backbone) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            'about': 'showAbout',
            'contact': 'showContact',
            'work': 'showWork',
            '*actions': 'showAbout'
        }
    });

    var start = function () {

        var app_router = new AppRouter();

        app_router.on('route:showAbout', function () {
            require(['views/about'], function (AboutView) {
                var aboutView = new AboutView();
                aboutView.render();
            });
        });

        app_router.on('route:showContact', function () {
            require(['views/contact'], function (ContactView) {
                var contactView = new ContactView();
                contactView.render();
            });
        });

        app_router.on('route:showWork', function () {
            require(['views/work'], function (WorkView) {
                var workView = new WorkView();
                workView.render();
            });
        });

        Backbone.history.start();
    };

    return {
        start: start
    };
});
