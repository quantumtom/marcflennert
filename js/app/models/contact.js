define([
    'models/base'
], function (BaseModel) {
    'use strict';

    return BaseModel.extend({
        url: 'http://localhost:5000/api/v1/contact',
        defaults: {
            name: '',
            email: '',
            telephone: ''
        }
    });
});

