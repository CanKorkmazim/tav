const getLocalStorage = require('./utils/getLocalStorage');
const getTwitterTab = require('./utils/getTwitterTab');
const sendTabMessage = require('./utils/sendTabMessage');
const sendTabMessageGetResponse = require('./utils/sendTabMessage');

const inject = require('./utils/inject');
const getTabs = require('./utils/getTabs');
const isTwitterTab = require('./utils/isTwitterTab');
const fetchBlocks = require('./utils/fetchBlocks');
const calculateBlock = require('./utils/calculateBlock');

async function init() {
    await chrome.action.setBadgeBackgroundColor({
        color : '#d53030'
    });
    await getTwitterTab();
}

chrome.alarms.onAlarm.addListener(async (alarm) => {
    switch (alarm.name) {
        case 'sync':
            await (async () => {
                const { blocking } = await calculateBlock();

                return chrome.action.setBadgeText({
                    text : (blocking && blocking.length > 0) ? String(blocking.length) : ''
                });

                // yanıp sönme devre dışı bırakıldı
                //
                // if (blocking && blocking.length > 0) {
                //     return chrome.action.setBadgeText({
                //         text:
                //     }).then(() => {
                //         let count = 0;
                //         let interval = setInterval(() => {
                //             chrome.action.setBadgeBackgroundColor({
                //                 color: (count % 2) ? '#000000' : '#d53030'
                //             }).then(() => {
                //                 if (count >= 30) return clearInterval(interval)
                //                 count++;
                //             })
                //         }, 100)
                //     })
                // } else {
                //     return chrome.action.setBadgeText({
                //         text: ''
                //     })
                // }
            })();

            chrome.alarms.create('sync', { when : Date.now() + (10 * 1000) });
            break;

    }
});

chrome.runtime.onInstalled.addListener(async () => {
    //chrome.storage.local.clear()
    // chrome.storage.sync.clear()
    await init();

    chrome.alarms.get('sync', a => {
        if (a) return;
        chrome.alarms.create('sync', { when : Date.now() + (10 * 1000) });
    });
});

chrome.tabs.onActivated.addListener(getTwitterTab);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && isTwitterTab(tab)) {
        return getTwitterTab();
    }
});

chrome.tabs.onRemoved.addListener(async (id, info) => {
    const twitterTab = await getLocalStorage('tab');
    if (twitterTab && twitterTab.id === id) return getTwitterTab();
});

chrome.storage.onChanged.addListener(async (data, storageType) => {
    if (data['processing']) {
        const processing = data['processing'];
        let processingNew = processing.hasOwnProperty('newValue') ? processing['newValue'] : null;
        let processingOld = processing.hasOwnProperty('oldValue') ? processing['oldValue'] : null;

        if (!processingNew && processingOld) return;

        if (processingNew && processingNew.hasOwnProperty('data') && processingNew.data.length > 0) {
            return chrome.action.setBadgeText({
                text : processingNew.data.length > 0 ? String(processingNew.data.length) : ''
            });
        }
    }

});

chrome.runtime.onStartup.addListener(async () => {await init();});