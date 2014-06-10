/*
 * ember-model-generator
 * https://github.com/zooshme/ember-model-generator
 *
 * Copyright (c) 2014, Ovidiu Spatacian-Tarnu
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer');

gulp.task('default', function (done) {
    var prompts = [{
        type: 'input',
        name: 'modelName',
        message: 'What is the name of your model?',
        default: gulp.args.join(' ')
    }, {
        type: 'input',
        name: 'modelAttributes',
        message: 'What attributes does your model have?',
        default: gulp.args.join(' '),
        filter: function(attrs) {
            var array = attrs.split(' ');
            array = array.map(function(item) {
                console.log(item);
                var attr = item.split(':');
                console.log(attr);
                var key = attr[0];
                var value = attr[1];
                return {
                    key: key,
                    value: value
                };
            });
            return array;
        }
    }];
    //Ask
    inquirer.prompt(prompts,
        function (answers) {
            // if (!answers.moveon) {
            //     return done();
            // }
            answers.modelNameSlug = _.slugify(answers.modelName);
            gulp.src(__dirname + '/templates/**')
                .pipe(template(answers))
                .pipe(gulp.dest('./'));
        });
});
