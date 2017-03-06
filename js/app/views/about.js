define([
    'views/base',
    'Handlebars',
    'hbar!parts/about',
    'json!data/about.json'
], function (BaseView, Handlebars, aboutPart, aboutData) {
    'use strict';

    return BaseView.extend({
        initialize: function () {
            this.content = aboutData;
            this.template = Handlebars.compile(aboutPart(this.content));
        }
    });
});
