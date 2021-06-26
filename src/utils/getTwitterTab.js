const getTabs = require('./getTabs');
const getLocalStorage = require('./getLocalStorage');
const sendTabMessage = require('./sendTabMessage');
const inject = require('./inject');
const isTwitterTab = require('./isTwitterTab');
const getTab = require('./getTab');
const timeoutPromise = require('./timeoutPromise');

module.exports = async () => {
    return timeoutPromise(5000, new Promise(async (resolve, reject) => {
        setTimeout(() => resolve(false), 5000);

        const tabs = await getTabs();

        // Sekmeler boş ise veya sekme yok ise
        if (!tabs || !Array.isArray(tabs) || tabs.length === 0) return resolve(false);

        const twitterTab = tabs.find(f => isTwitterTab(f));

        // Twitter sekmesi bulunmuyorsa
        if (!twitterTab) return resolve(false);

        const tabStore = await getLocalStorage('tab');

        // Depoda var ise ve sekme bulunuyorsa ve ping dönerse
        if (tabStore && await getTab(tabStore.id) && await inject(tabStore.id) && await sendTabMessage(tabStore.id, 'ping')) return resolve(tabStore)

        if (await inject(twitterTab.id) && await sendTabMessage(twitterTab.id, 'ping')) return chrome.storage.local.set({tab: twitterTab}, () => resolve(twitterTab))

        resolve(false);
    }))
}