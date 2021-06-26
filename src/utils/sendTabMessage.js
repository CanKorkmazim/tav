const timeoutPromise = require('./timeoutPromise');

module.exports = async (tabId, message) => {
    return timeoutPromise(5000, new Promise((resolve, reject) => {
        try {
            chrome.tabs.sendMessage(tabId, message, (response) => {
                resolve(response)
            })
        } catch (e) {
            resolve(false);
        }
    }))
}