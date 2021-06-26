const timeoutPromise = require('./timeoutPromise');

module.exports = () => {
    return timeoutPromise(5000, new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            try {
                chrome.tabs.query({})
                    .then(e => {
                        clearInterval(interval);
                        resolve(e);
                    }).catch(e => false)
            } catch (e) {
                resolve(false)
                clearInterval(interval)
            }
        }, 10)

        setTimeout(() => {
            resolve(false)
            clearInterval(interval)
        }, 5000);
    }))

}