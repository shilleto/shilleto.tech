var Metalsmith = require('metalsmith');
    templates  = require('metalsmith-in-place');


Metalsmith(__dirname)
    .destination('./site')
    .use(templates({engine: 'jade', rename: true, partials: 'templates/partials', pattern: '*.jade'}))
    .build(function (err) { if(err) console.log(err) });


