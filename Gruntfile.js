module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        
        pkg : grunt.file.readJSON('package.json'),
        bower : {
            install : {
                options : {
                    targetDir : 'client/requires',
                    layout : 'byComponent'
                }
            }
        },
        clean : {
            build : ['build'],
            dev : {
                src : ['build/app.js', 'build/<%= pkg.name %>.js']
            },
            prod : ['dist']
        },
        browserify : {
            vendor : {
                src : ['client/requires/**/*.js'],
                dest : 'build/vendor.js',
                options : {
                    shim : {
                        jquery : {
                            path : 'client/requires/jquery/js/jquery.js',
                            exports : '$'
                        },
                        underscore : {
                            path : 'client/requires/underscore/js/underscore.js',
                            exports : '_'
                        },
                        backbone : {
                            path : 'client/requires/backbone/js/backbone.js',
                            exports : 'Backbone',
                            depends : {
                                underscore : '_'
                            }
                        },
                        'backbone.marionette' : {
                            path : 'client/requires/backbone.marionette/js/backbone.marionette.js',
                            exports : 'Marionette',
                            depends : {
                                jquery : '$',
                                backbone : 'Backbone',
                                underscore : '_'
                            }
                        }
                    }
                }
            },
            app : {
                files : {
                    'build/app.js' : ['client/src/main.js']
                },
                options : {
                    transform : ['hbsfy'],
                    external : ['jquery','underscore','backbone','backbone.marionette']
                }
            },
            test : {
                files : {
                    'build/test.js' : ['client/spec/**/*.test.js']
                },
                options : {
                    transform : ['hbsfy'],
                    external : ['jquery','underscore','backbone','backbone.marionette']
                }
            }
        }
    });
}