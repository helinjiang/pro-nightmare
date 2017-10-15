var Nightmare = require('nightmare');
var nightmare = Nightmare({show: true});

nightmare.on('console', function (type, msg) {
    console[type](msg);
});

nightmare.on('did-get-response-details',
    function (event, status, newURL, originalURL, httpResponseCode,
              requestMethod, referrer, headers, resourceType) {
        console.log('\n');
        /**
         event Event
         status Boolean
         newURL String
         originalURL String
         httpResponseCode Integer
         requestMethod String
         referrer String
         headers Object
         resourceType String
         */
        console.log(resourceType, headers['content-length'], originalURL);
    });

nightmare.goto('https://www.baidu.com')
    .type('form[action*="/s"] [name=f]', 'nightmare')
    .click('form[action*="/s"] [type=submit]')
    .wait('#content_left')
    .evaluate(function () {
        return {
            count: $('#container .nums').text()
        };
    })
    .end()
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });