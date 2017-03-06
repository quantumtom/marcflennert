define([
    'views/base',
    'Handlebars',
    'hbar!parts/contact',
    'json!data/contact.json',
    'models/contact'
], function (BaseView, Handlebars, contactPart, contactData, ContactModel) {
    'use strict';

    return BaseView.extend({
        events: {
            'click #submitContact': 'onSubmit'
        },
        initialize: function (options) {
            this.options = options;
            this.content = contactData;
            this.template = Handlebars.compile(contactPart(this.content));
        },
        onSubmit: function (event) {
            event.preventDefault();

            var formData = $('#contactForm').serializeArray();
            var contactModel = new ContactModel();

            formData.forEach(function (c) {
                var name = c.name;
                var value = c.value;

                contactModel.set(name, value);
            });

            this.model = contactModel;

            this.model.save({
                success: function (account) {
                    window.console.log(JSON.stringify(account));
                },
                error: function (account, response) {
                    window.console.error('error: ' + response);
                }
            });
        }
    });
});
