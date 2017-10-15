var Nightmare = require('nightmare');
var nightmare = Nightmare({show: true});

nightmare.goto('https://www.baidu.com')
    .type('form[action*="/s"] [name=f]', 'nightmare')
    .click('form[action*="/s"] [type=submit]')
    .wait('#content_left')
    .evaluate(function () {
        return Array.prototype.map.call(
            document.querySelectorAll('#content_left .c-container'),
            function (item) {
                return item.querySelector('.t').innerText;
            });
    })
    .end()
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });