module.exports = function interceptor(data, callback) {
    if (!callback) return data;
    return data.map(d => callback.call(this, d));
}
