// const mergeConfig = require('./mergeConfig');
const request = require('./request');
const interceptor = require('./interceptor');
module.exports = class Amark {
    constructor(config) {
        this.request = request({ url: config.url })
        this.data = [];
        this.interceptor = null
        this.maxLength = config.maxLength || 5;
        this.waitTime = config.waitTime === undefined ? 5000 : config.waitTime;

        this.commitTimer = null;
        this.init()
    }
    init() {
        window.addEventListener("beforeunload", () => {
            if (this.data.length) { this.commit() }
        })

        this.commitTimer = this.setCommitTimer()
    }
    use(fn) {
        this.interceptor = fn
    }
    add(data) {
        data = interceptor(data, this.interceptor)
        const len = this.data.push(data)
        if (len > this.maxLength) { this.commit() }
    }
    commit() {
        this.commitTimer = this.setCommitTimer()
        const data = this.data.slice(0)
        this.data = []
        return this.request({
            method: 'post',
            data: data
        })
    }
    setCommitTimer() {
        if (this.commitTimer !== null) { clearTimeout(this.commitTimer) }
        return setTimeout(() => {
            if (this.data.length) { this.commit() }
            else { this.commitTimer = this.setCommitTimer() }
        }, this.waitTime);
    }
}
