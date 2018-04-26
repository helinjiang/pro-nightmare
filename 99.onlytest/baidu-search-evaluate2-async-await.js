var Nightmare = require('nightmare');

var nightmare = Nightmare({ show: true });

async function mytest() {
    const first = await nightmare
        .goto('https://www.baidu.com')
        .evaluate(() => {
            return document.title;
        });

    console.log('--1--', first);

    const second = await nightmare
        .type('form[action*="/s"] [name=f]', 'nightmare')
        .click('form[action*="/s"] [type=submit]')
        .wait('#content_left')
        .evaluate(function () {
            return Array.from(
                document.querySelectorAll('#content_left .c-container'))
                .map(function (item) {
                    return item.querySelector('.t').innerText;
                });
        });

    console.log('--2--', second);

    await nightmare.end();

    return [].concat(first, second);
}

mytest()
    .then((data) => {
        console.log('\n then data', data);
    })
    .catch((err) => {
        console.error('\n catch err', err);
    });