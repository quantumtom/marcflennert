define([
    'views/base',
    'Handlebars',
    'hbar!parts/work',
    'json!data/work.json'
], function (BaseView, Handlebars, workPart, workData) {
    'use strict';

    return BaseView.extend({
        initialize: function () {
            this.content = workData;
            this.template = Handlebars.compile(workPart(this.content));
        }
    });
});
