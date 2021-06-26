;(async () => {
    if (window._TwitterAntiTroll) return;
    window._TwitterAntiTroll = true;
    console.log('Twitter Anti Virus');

    const getLocalStorage = require('./utils/getLocalStorage');
    const sleep = require('./utils/sleep');

    if (!Array.prototype.hasOwnProperty('chunk')) {
        Object.defineProperty(Array.prototype, 'chunk', {
            value: function (chunkSize) {
                let array = this;
                return [].concat.apply([],
                    array.map(function (elem, i) {
                        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
                    })
                );
            }
        });
    }
    if (!String.prototype.hasOwnProperty('replaceAll')) {
        String.prototype.replaceAll = function (search, replacement) {
            let target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };
    }
    if (!String.prototype.hasOwnProperty('replaceArray')) {
        String.prototype.replaceArray = function (find, replace) {
            let replaceString = this;
            let regex;
            for (let i = 0; i < find.length; i++) {
                regex = new RegExp(find[i], "g");
                replaceString = typeof replace === 'string'
                    ? replaceString.replace(regex, replace)
                    : (typeof replace === 'object' && replace.length === 1
                        ? replaceString.replace(regex, replace[0])
                        : replaceString.replace(regex, replace[i]));
            }
            return replaceString;
        };
    }


    let INITIALIZED = false;

    class App {

        // static TWITTER_MAIN_SCRIPT_URL = [
        //     `//abs.twimg.com/responsive-web/client-web/main.%ID%.js`,
        //     `//abs.twimg.com/responsive-web/client-web-legacy/main.%ID%.js`
        // ];
        static TWITTER_AUTHENTICATION_TOKEN = 'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
        static TWITTER_CSRF_TOKEN_COOKIE_KEY = 'ct0';

        static GQL = {
            BlockedAccountsAll: {
                address: `//twitter.com/i/api/graphql/%ID%/BlockedAccountsAll?variables=%VARIABLES%`,
                identifier: null,
                method: 'get',
                variables: {
                    count: 1000,
                    //cursor: "",
                    withHighlightedLabel: false,
                    withTweetQuoteCount: false,
                    //includePromotedContent: false,
                    withTweetResult: false,
                    withReactions: false,
                    withSuperFollowsTweetFields: false,
                    //withNonLegacyCard: false,
                    //withBirdwatchNotes: false,
                    withBirdwatchPivots: false,
                    //withUserResults: false,
                    //withDmMuting:false,
                    //withVoice:false,
                    //withClientEventToken:false,
                    //isListMemberTargetUserId:0,
                    //withCommunity:false

                }
            },
            UserByRestId: {
                address: `//twitter.com/i/api/graphql/%ID%/UserByRestId?variables=%VARIABLES%`,
                identifier: null,
                method: 'get',
                variables: {
                    count: 15000,
                    userId: null,
                    withHighlightedLabel: true
                }
            },
            UserByRestIdWithoutResults: {
                address: `//twitter.com/i/api/graphql/%ID%/UserByRestIdWithoutResults?variables=%VARIABLES%`,
                identifier: null,
                method: 'get',
                variables: {
                    count: 15000,
                    userId: null,
                    withHighlightedLabel: true
                }
            },
            UserByScreenName: {
                address: `//twitter.com/i/api/graphql/%ID%/UserByScreenName?variables=%VARIABLES%`,
                identifier: null,
                method: 'get',
                variables: {
                    count: 15000,
                    userId: null,
                    withHighlightedLabel: true
                }
            },
            UserByScreenNameWithoutResults: {
                address: `//twitter.com/i/api/graphql/%ID%/UserByScreenNameWithoutResults?variables=%VARIABLES%`,
                identifier: null,
                method: 'get',
                variables: {
                    count: 15000,
                    userId: null,
                    withHighlightedLabel: true
                }
            },
            UsersByRestIds: {
                address: `//twitter.com/i/api/graphql/%ID%/UsersByRestIds?variables=%VARIABLES%`,
                identifier: null,
                method: 'get',
                variables: {
                    count: 15000,
                    userIds: [],
                    withHighlightedLabel: true,
                    withDmMuting: true
                }
            },
            UsersByRestIdsWithoutResults: {
                address: `//twitter.com/i/api/graphql/%ID%/UsersByRestIdsWithoutResults?variables=%VARIABLES%`,
                identifier: null,
                method: 'get',
                variables: {
                    count: 15000, // Default da bulunmuyor
                    userIds: [],
                    withHighlightedLabel: true,
                    withDmMuting: true

                }
            },
        };
        static process = false;

        static handleBlock(data) {
            if (!data) return false;

            (async () => {
                for (const block of data) {
                    if (!this.process) return chrome.storage.local.remove('processing');

                    const c1 = performance.now();
                    const processing = await getLocalStorage('processing');
                    const ignore = await getLocalStorage('ignore');
                    const isIgnore = Array.isArray(ignore) && ignore.length > 0 && ignore.indexOf(block) !== -1;

                    if (!processing || isIgnore) return;

                    const get = await this.blockUserById(block);

                    const newProcessingData = processing.data.filter(f => f !== block);

                    chrome.storage.local.set({
                        processing: {
                            data: newProcessingData
                        }
                    });
                    const c2 = performance.now();

                    if (1000 > (c2 - c1)) await sleep(1000 - (c2 - c1));

                    if (get.errors) {
                        switch (get.errors[0].code) {
                            case 50:
                                console.log(`%cBULUNAMADI%c${block}`,
                                    'color:white;background-color:red;font-weight:bold;padding:3px;margin:1px 2px;border-radius:5px',
                                    'color:white;background-color:#000;font-weight:bold;padding:3px;margin:1px 2px;border-radius:5px',
                                );
                                if (!isIgnore) chrome.storage.local.set({
                                    ignore: Array.isArray(ignore) ? ignore.concat(block) : [block]
                                })

                                continue;
                            case 32:
                                console.log(`%cGİRİŞ%cTekrar giriş yapmanız gerekiyor`,
                                    'color:white;background-color:red;font-weight:bold;padding:3px;margin:1px 2px;border-radius:5px',
                                    'color:#868686;background-color:#000;font-weight:italic;padding:3px;margin:1px 2px;border-radius:5px;',
                                );
                                continue;
                            case 326:
                                console.log(`%cSPAM%cSpam engeline takıldı. Tekrar giriş yapmanız lazım.`,
                                    'color:white;background-color:red;font-weight:bold;padding:3px;margin:1px 2px;border-radius:5px',
                                    'color:#868686;background-color:#000;font-weight:italic;padding:3px;margin:1px 2px;border-radius:5px;',
                                );
                                continue;
                            default:
                                console.log(get.errors);
                        }
                    }

                    console.log(`%cENGELLENDİ%c@${get.username}%c${get.description}`,
                        'color:white;background-color:green;font-weight:bold;padding:3px;margin:1px 2px;border-radius:5px',
                        'color:white;background-color:#000;font-weight:bold;padding:3px;margin:1px 2px;border-radius:5px',
                        'color:#868686;background-color:#000;font-weight:italic;padding:3px;margin:1px 2px;border-radius:5px;',
                    );

                }
            })();
        }

        static async init() {
            try {
                const mainScriptContent = await this.getMainScriptContent();

                this.GQL.BlockedAccountsAll.identifier = this.convertGqlIdentifier('BlockedAccountsAll', mainScriptContent)
                this.GQL.UserByRestId.identifier = this.convertGqlIdentifier('UserByRestId', mainScriptContent)
                this.GQL.UserByRestIdWithoutResults.identifier = this.convertGqlIdentifier('UserByRestIdWithoutResults', mainScriptContent)
                this.GQL.UserByScreenName.identifier = this.convertGqlIdentifier('UserByScreenName', mainScriptContent)
                this.GQL.UserByScreenNameWithoutResults.identifier = this.convertGqlIdentifier('UserByScreenNameWithoutResults', mainScriptContent)
                this.GQL.UsersByRestIds.identifier = this.convertGqlIdentifier('UsersByRestIds', mainScriptContent)
                this.GQL.UsersByRestIdsWithoutResults.identifier = this.convertGqlIdentifier('UsersByRestIdsWithoutResults', mainScriptContent)

                return true;

            } catch (e) {
                console.log(e.message)
            }

            return false;
        }

        static getMainScriptUrl() {
            const mainScript = document.querySelector('head link[rel="preload"][href*="/main."]');
            if (mainScript) return mainScript.href;

            return false;
        }

        // static getMainScriptId(content) {
        //     return content.match(/<link rel="preload" as="script" crossorigin="anonymous" href="https:\/\/abs.twimg.com\/responsive-web\/client-web\/main.(\w+?).js"/)[1]
        // }

        static async getMainScriptContent() {
            const mainScriptUrl = this.getMainScriptUrl();
            if (!mainScriptUrl) return false;

            const fetchMainScript = await fetch(mainScriptUrl);

            return (await fetchMainScript.text()).replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g, '');
        }

        static convertGqlIdentifier(identifierName, content) {
            return content.match(new RegExp(`queryId:"([^"]*)\\w+",operationName:"${identifierName}"`, 'g'))[0].match(/queryId:"(.*?)"/)[1]
        }

        static async getUserById(id) {
            const get = await this.fetchGql(this.GQL.UserByRestIdWithoutResults, {
                userId: String(id)
            });
            const json = await get.json();

            if (json.errors) return {
                id: String(id),
                errors: json.errors
            }

            return {
                id: json['data']['user']['rest_id'],
                username: json['data']['user']['legacy']['screen_name'],
                name: json['data']['user']['legacy']['name'],
                description: json['data']['user']['legacy']['description'],
                profile_image_url: json['data']['user']['legacy']['profile_image_url_https'].replaceArray(['https://', 'http://', '_normal'], '')
            }
        }

        static async getUsersById(ids) {
            const get = await this.fetchGql(this.GQL.UsersByRestIdsWithoutResults, {
                userId: ids
            });
            return await get.json()
        }

        static async getUserByUsername(username) {
            const get = await this.fetchGql(this.GQL.UserByScreenNameWithoutResults, {
                screen_name: String(username)
            });
            const json = await get.json();

            if (json.errors) return {
                username: String(username),
                errors: json.errors
            }

            return {
                id: json['data']['user']['rest_id'],
                username: json['data']['user']['legacy']['screen_name'],
                name: json['data']['user']['legacy']['name'],
                description: json['data']['user']['legacy']['description'],
            }
        }

        static hasMore(cursor) {
            const value = cursor['content']['value'];
            const valueSplit = value.split('|');
            return valueSplit[0] !== "0";
        }

        static async getCurrentBlockedUsers() {
            const get = await this.fetchGql(this.GQL.BlockedAccountsAll);
            const json = await get.json();
            let list = [];

            const getBottomCursor = (json) => {
                return json['data']['viewer']['timeline']['timeline']['instructions']
                    .find(f => f['type'] === "TimelineAddEntries")['entries']
                    .find(f => f['content']['entryType'] === "TimelineTimelineCursor" && f['content']['cursorType'] === "Bottom")
            }
            const getList = (json) => {
                return json['data']['viewer']['timeline']['timeline']['instructions']
                    .find(f => f['type'] === "TimelineAddEntries")['entries']
                    .filter(f => f['content']['entryType'] === "TimelineTimelineItem" && f['content']['itemContent']['itemType'] === "TimelineUser");
            }

            const cursorBottom = getBottomCursor(json)
            list = getList(json)

            const page = async (cursor) => {
                const get = await this.fetchGql(this.GQL.BlockedAccountsAll, {
                    cursor: cursor['content']['value']
                });
                const json = await get.json();
                const cursorBottom = getBottomCursor(json)
                list = list.concat(getList(json))
                if (this.hasMore(cursorBottom)) await page(cursorBottom)
            }

            if (this.hasMore(cursorBottom)) await page(cursorBottom)

            return list.map(m => {
                return {
                    id: m['content']['itemContent']['user']['rest_id'],
                    username: m['content']['itemContent']['user']['legacy']['screen_name'],
                    name: m['content']['itemContent']['user']['legacy']['name'],
                    description: m['content']['itemContent']['user']['legacy']['description'],
                }
            })
        }

        static async blockUserById(id) {
            const get = await fetch("//twitter.com/i/api/1.1/blocks/create.json", {
                "headers": {
                    "authorization": `Bearer ${this.TWITTER_AUTHENTICATION_TOKEN}`,
                    "x-csrf-token": this.getCookie(this.TWITTER_CSRF_TOKEN_COOKIE_KEY),
                    "content-type": "application/x-www-form-urlencoded"
                },
                "body": `user_id=${id}`,
                "method": "POST",
            });
            const json = await get.json();

            if (json.errors) return {
                id: Number(id),
                errors: json.errors
            }

            return {
                id: json['id'],
                username: json['screen_name'],
                name: json['name'],
                description: json['description'],
            }

        }

        static async removeBlockUserById(id) {
            const get = await fetch("//twitter.com/i/api/1.1/blocks/destroy.json", {
                "headers": {
                    "authorization": `Bearer ${this.TWITTER_AUTHENTICATION_TOKEN}`,
                    "x-csrf-token": this.getCookie(this.TWITTER_CSRF_TOKEN_COOKIE_KEY),
                    "content-type": "application/x-www-form-urlencoded"
                },
                "body": `user_id=${id}`,
                "method": "POST",
            });
            const json = await get.json();

            if (json.errors) return {
                id: Number(id),
                errors: json.errors
            }

            return {
                id: json['id'],
                username: json['screen_name'],
                name: json['name'],
                description: json['description'],
            }
        }

        static async fetchGql(gql, variables = {}) {
            const url = gql.address
                .replace('%ID%', gql.identifier)
                .replace('%VARIABLES%', encodeURIComponent(JSON.stringify(Object.assign({}, gql.variables, variables))));
            return await fetch(url, {
                "method": gql.method,
                "headers": {
                    "authorization": `Bearer ${this.TWITTER_AUTHENTICATION_TOKEN}`,
                    "x-csrf-token": this.getCookie(this.TWITTER_CSRF_TOKEN_COOKIE_KEY),
                },
            }).then(e => e).catch(e => false);
        }

        static getCookie(cname) {
            let name = cname + '='
            let ca = document.cookie.split(';')
            for (let i = 0; i < ca.length; ++i) {
                let c = ca[i].trim()
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length)
                }
            }
            return ''
        }
    }

    class Message {
        static meta(req, sender, res) {
            if (!INITIALIZED) return res('meta', false);
            let element = document.querySelector('body > :nth-child(3)');
            let jsonText = element.text.split(';')[0].replace('window.__INITIAL_STATE__=', '');

            res('meta', JSON.parse(jsonText))
        }

        static csrfToken(req, sender, res) {
            if (!INITIALIZED) return res('csrfToken', false);

            res('csrfToken', App.getCookie(App.TWITTER_CSRF_TOKEN_COOKIE_KEY))
        }

        static async userById(req, sender, res) {
            if (!INITIALIZED) return res('userById', false);

            res('userById', await App.getUserById(req['data']['user_id']))
        }

        static async currentBlocks(req, sender, res) {
            if (!INITIALIZED) return res('currentBlocks', false);

            res('currentBlocks', await App.getCurrentBlockedUsers());
        }

        static async ping(req, sender, res) {
            res('ping', true);
        }
    }

    async function initialize() {
        if (await App.init())
            INITIALIZED = true;
    }

    const messageListener = (req, sender, res) => {
        (async () => {
            const response = (type, data) => {
                return res({
                    type: type,
                    data: data
                })
            }

            if (typeof req === "string" && Message.hasOwnProperty(req)) {
                Message[req](req, sender, response)
            } else if (req.type && Message.hasOwnProperty(req.type)) {
                Message[req.type](req, sender, response)
            } else {
                res(null)
            }
        })()

        return true
    }
    if (chrome.runtime && chrome.runtime.onMessage) {
        if (chrome.runtime.onMessage.hasListener(messageListener)) {
            chrome.runtime.onMessage.removeListener(messageListener)
        }
        chrome.runtime.onMessage.addListener(messageListener)

    }


    if (!INITIALIZED) await initialize();

    const storageChangeListener = (data, storageType) => {
        if (data['processing']) {
            const processingNew = data['processing']['newValue'];
            const processingOld = data['processing']['oldValue'];

            if (processingNew && processingNew.hasOwnProperty('status') && processingNew.status === 1) {
                App.process = true;
                App.handleBlock(processingNew.data);
            }

            if (!processingNew && processingOld) App.process = false;
        }
    }
    if (chrome.storage && chrome.storage.onChanged) {
        if (chrome.storage.onChanged.hasListener(storageChangeListener)) {
            chrome.storage.onChanged.removeListener(storageChangeListener)
        }
        chrome.storage.onChanged.addListener(storageChangeListener)

    }


    const processing = await getLocalStorage('processing');
    if (processing && processing.hasOwnProperty('data') && processing.data.length > 0) {
        App.process = true;
        App.handleBlock(processing.data)
    }
})()
