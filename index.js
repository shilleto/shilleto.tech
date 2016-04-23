var Metalsmith = require('metalsmith');
    filenames  = require('metalsmith-filenames');
    layouts  = require('metalsmith-layouts');
    htmlMinify = require('metalsmith-html-minifier');
    less = require('metalsmith-less');
    uglify = require('metalsmith-uglify');


Metalsmith(__dirname)
    .destination('./site')
    .use(less({
            pattern: "**/*.less",
            render: {
                paths: ['src/stylesheets/less'],
                compress: true
            }
    }))
    .use(filenames())
    .use(layouts({engine: 'jade'}))
    .use(htmlMinify())
    .use(uglify({removeOriginal: true}))
    .build(function (err) { if(err) console.log(err) });
