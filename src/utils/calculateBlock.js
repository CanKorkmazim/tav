const getTwitterTab = require('./getTwitterTab')
const sendTabMessage = require('./sendTabMessage')
const fetchBlocks = require('./fetchBlocks')
const getLocalStorage = require('./getLocalStorage')

module.exports = async () => {
    const twitterTab = await getTwitterTab();
    if (!twitterTab) return {
        error: 1
    }

    const metaData = await sendTabMessage(twitterTab.id, {type: 'meta'});
    if (!metaData || !metaData.data || !metaData['data']['session']['user_id']) return {
        error: 1
    }

    const user = await sendTabMessage(twitterTab.id, {
        type: 'userById',
        data: {
            user_id: metaData['data']['session']['user_id']
        }
    });

    if (!user) return {
        error: 1
    }

    const fetchCurrentBlocks = (await sendTabMessage(twitterTab.id, {
        type: 'currentBlocks',
    })).data;

    const currentBlocksIds = Object.assign([], fetchCurrentBlocks.map(m => m.id));
    const blocks = await fetchBlocks();
    const currentBlocks = Object.assign([], currentBlocksIds.filter(f => blocks.includes(f)));
    const blocking = Object.assign([], blocks.filter(f => !currentBlocks.includes(f)));

    const ignore = await getLocalStorage('ignore');

    return {
        meta:metaData.data,
        user:user.data,
        current: currentBlocks,
        blocks: blocks.filter(f => (ignore && Array.isArray(ignore) && ignore.length > 0)
            ? ignore.indexOf(f) === -1
            : true
        ),
        blocking: blocking.filter(f => (ignore && Array.isArray(ignore) && ignore.length > 0)
            ? ignore.indexOf(f) === -1
            : true
        )
    };
}