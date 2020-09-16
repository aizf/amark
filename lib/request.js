const axios = require("axios")
module.exports = function request(config) {
    return axios.create(config)
}