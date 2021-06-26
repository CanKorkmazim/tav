const timeoutPromise = require('./timeoutPromise');

module.exports = async (key) => {
    return timeoutPromise(5000, new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get(key, (response) => {
                resolve(response[key])
            })
        } catch (e) {
            resolve(e.message);
        }
    }))
}