var Nightmare = require('nightmare');
var nightmare = Nightmare({show: true});

nightmare.goto('https://www.baidu.com')
    .type('form[action*="/s"] [name=f]', 'nightmare')
    .click('form[action*="/s"] [type=submit]')
    .wait('#content_left')
    .evaluate(function () {
        // 如果页面本身就有全局变量，也可以直接使用
        return {
            count: $('#container .nums').text(),
            localVar: typeof window.bds
        };
    })
    .end()
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });