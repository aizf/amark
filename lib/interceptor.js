module.exports = function interceptor(data, callback) {
    if (!callback) return data;
    return callback.call(this, data)
}
