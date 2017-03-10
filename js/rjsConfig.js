define(function () {
    // For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
    requirejs.config({
        baseUrl: 'js',
        paths: {
            // the left side is the module ID,
            // the right side is the path to
            // the jQuery file, relative to baseUrl.
            // Also, the path should NOT include
            // the '.js' file extension.
            backbone:           'lib/backbone',
            bootstrap:          'lib/bootstrap',
            ga:                 'lib/ga',
            Handlebars:         'lib/handlebars',
            hbar:               'lib/hbars',
            jquery:             'lib/jquery',
            json:               'lib/json',
            text:               'lib/text',
            twbs:               'lib/twbs',
            underscore:         'lib/underscore',
            validator:          'lib/validator'
        },
        shim: {
            backbone: {
                deps: ['underscore', 'json'],
                exports: 'Backbone'
            },
            bootstrap: {
                deps: ['jquery']
            },
            Handlebars: {
                deps: ['bootstrap'],
                exports: 'Handlebars'
            },
            'jquery': {
                exports: '$'
            },
            json: {
                exports: 'JSON'
            },
            underscore: {
                exports: '_'
            },
            text: {
                exports: 'text'
            },
            validator: {
                deps: ['jquery']
            }
        },
        hbars: {
            extension: '.hbar' // default = '.html'
        }
    });
});
