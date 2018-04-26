var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });

var nightmareResult = nightmare.goto('https://www.baidu.com');

nightmareResult
    .evaluate(function () {
        return document.title;
    })
    .then(function (result) {
        console.log('--1--', result);

        nightmareResult
            .type('form[action*="/s"] [name=f]', 'nightmare')
            .click('form[action*="/s"] [type=submit]')
            .wait('#content_left')
            .evaluate(function () {
                return Array.from(
                    document.querySelectorAll('#content_left .c-container'))
                    .map(function (item) {
                        return item.querySelector('.t').innerText;
                    });
            })
            .end()
            .then(function (result) {
                console.log('--2--', result);
            });
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });
