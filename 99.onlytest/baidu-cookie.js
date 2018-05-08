var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });

// (async function main() {
//     let cookies = await nightmare
//         .cookies.set({
//             url: "https://www.navossoc.com",
//             name: "myKey",
//             value: "myValue"
//         })
//         .goto("https://www.navossoc.com/tests/cookie.php")
//         .cookies.get();
//
//     console.log(cookies);
// })();

nightmare
    .cookies.set({
    url: 'https://www.navossoc.com',
    name: 'myKey',
    value: 'myValue'
})
    .goto('https://www.navossoc.com/tests/cookie.php')
    .evaluate(function () {
        return {
            cookie: document.cookie
        };
    })
    .end()
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });

