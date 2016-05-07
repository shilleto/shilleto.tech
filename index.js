var Metalsmith = require('metalsmith');
    filenames  = require('metalsmith-filenames');
    layouts  = require('metalsmith-layouts');
    htmlMinify = require('metalsmith-html-minifier');
    less = require('metalsmith-less');
    uglify = require('metalsmith-uglify');
    concat = require('metalsmith-concat');
    cleanCSS = require('metalsmith-clean-css');
    uncss = require('metalsmith-uncss');
    inlineSource = require('metalsmith-inline-source');
    critical = require('critical');
    fs = require('fs');



Metalsmith(__dirname)
    .destination('./site')
    .use(filenames())
    .use(layouts({engine: 'jade'}))
    .use(htmlMinify())
    .use(uglify({
        removeOriginal: true
    }))
    .use(less({
        pattern: "**/*.less",
        render: {
            paths: ['src/stylesheets/less'],
            compress: true
        }
    }))
    .use(concat({
        files: '**/*.css',
        output: 'stylesheets/css/app.css'
    }))
    .use(uncss({
        css: ['app.css'],
        html: ['index.html'],
        output: 'app.css',
        basepath: 'stylesheets/css'
    }))
    .use(cleanCSS({
        files: 'stylesheets/css/app.css',
        cleanCSS: {
            rebase: false,
            keepSpecialComments: 0
        }
    }))
    //.use(inlineSource({rootpath: 'site'}))
    .build(function (err) {
        if(err) console.log(err)
        critical.generate({
            inline: true,
            base: 'site/',
            src: 'index.html',
            dest: 'site/index.html',
            minify: true,
            extract: true,
            width: 1300,
            height: 900
        });

    });