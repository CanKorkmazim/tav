const timeoutPromise = require('./timeoutPromise');

module.exports = async (tabId) => {
    if (!tabId) return false;

    return timeoutPromise(5000, new Promise((resolve) => {
        chrome.scripting.executeScript({
            target: {
                tabId: tabId
            },
            files: ['./foreground.js']
        }).then(e => resolve(e)).catch(e => resolve(false))
    }))
}