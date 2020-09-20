const axios = require("axios")
module.exports = function request(config) {
    console.log(config);
    return axios.create(config)
}