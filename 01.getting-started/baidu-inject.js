var Nightmare = require('nightmare');
var nightmare = Nightmare({show: true});

nightmare.on('console', function (type, msg) {
    console[type](msg);
});

nightmare.goto('https://www.baidu.com')

    .type('form[action*="/s"] [name=f]', 'nightmare')
    .click('form[action*="/s"] [type=submit]')
    .wait('#content_left').inject('js', './run-in-client/test-util.js')
    .evaluate(function () {
        return {
            byVar: typeof window.testUtilByVar,
            byWindow: typeof window.testUtilByWindow
        };
    })
    .end()
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });