const timeoutPromise = require('./timeoutPromise');

module.exports = async (tabId) => {
    return timeoutPromise(5000, new Promise((resolve, reject) => {
        chrome.tabs.get(tabId).then(e => resolve(e)).catch(e => resolve(false))
    }))
}