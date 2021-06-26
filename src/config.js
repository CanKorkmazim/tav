module.exports = {
    mainScriptUrl:'//abs.twimg.com/responsive-web/client-web/main.%ID%.js',
    authToken: 'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
    csrfTokenCookie:'ct0',
    GraphQL: {
        BlockedAccountsAll: {
            address: `//twitter.com/i/api/graphql/%ID%/BlockedAccountsAll?variables=%VARIABLES%`,
            identifier: null,
            method: 'get',
            variables: {
                count: 15000,
                //cursor: "",
                withHighlightedLabel: false,
                withTweetQuoteCount: false,
                includePromotedContent: false,
                withTweetResult: false,
                withReactions: false,
                withNonLegacyCard: false,
                withBirdwatchNotes: false,
                withBirdwatchPivots: false,
                withUserResults: false,
                withDmMuting: false,
                withVoice: false,
                withClientEventToken: false,
                //isListMemberTargetUserId: 0,
                withCommunity: false,
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
    }
}