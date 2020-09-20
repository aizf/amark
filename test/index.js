const Amark = require('../index');

let amark = new Amark({
    url: "http://localhost:3000/interactive-data"
})

let obj = { 1: 1, 2: 2, basdsad: 123123 }
amark.use((data) => {
    return {a:2}
})
amark.add(obj)