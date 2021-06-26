<main>
    <div class="loading {loading ? 'open' : ''}">
        <img src="./assets/images/loading.gif" alt="asd">
    </div>
    <div class="header">
        <div class="profileImage" style="{`background-image:url(${session ? `https://${session.profile_image_url}` : loadingImage})`}"></div>
    </div>
    <div class="content-wrapper">
        <div class="content">
            {#if !session}
                <div class="noLogin">
                    Lütfen önce bir her hangi bir sekmeden Twitter hesabınıza giriş yapın.
                </div>
            {:else}
                <div class="name">{session.name}</div>
                <hr>
                <ul class="info totalTroll">
                    <li><i></i> Toplam Troll</li>
                    <li>
                        {#if blocks}
                            {blocks.length}
                        {:else}
                            <img src="./assets/images/loading.gif" alt=""/>
                        {/if}
                    </li>
                </ul>
                <ul class="info currentBlocks">
                    <li><i></i> Yasaklanmış</li>
                    <li>
                        {#if currentBlocks}
                            {currentBlocks.length}
                        {:else}
                            <img src="./assets/images/loading.gif" alt=""/>
                        {/if}
                    </li>
                </ul>
                <ul class="info blocking">
                    <li><i></i> Yasaklanacak</li>
                    <li>
                        {#if blocking}
                            {blocking.length}
                        {:else}
                            <img src="./assets/images/loading.gif" alt=""/>
                        {/if}
                    </li>
                </ul>
                {#if status === null}
                    <div class="button loading">
                        <img src="./assets/images/loading.gif" alt=""/>
                    </div>
                {:else if status === 1}
                    <div class="button blocking" on:click={handleCancelBlock}>
                        <div class="text">
                            Yasaklanıyor <img src="./assets/images/loading.gif" draggable="false" alt=""/>
                        </div>
                        <ul class="status">
                            <li>Kalan:</li>
                            <li>{remaining ? remaining : blocking.length}</li>
                        </ul>
                    </div>
                {:else if status === 2}
                    <div class="button ready" on:click={handleBlock}>
                        <div class="text">
                            Yasakla
                        </div>
                        <ul class="status">
                            <li>Toplam:</li>
                            <li>{remaining ? remaining : blocking.length}</li>
                        </ul>
                    </div>
                {:else if status === 3}
                    <div class="button finish">
                        <i></i>
                    </div>
                {/if}
            {/if}
        </div>
    </div>
</main>
<style src="./app.scss"></style>
<script>

    const sendTabMessageGetResponse = require('../utils/sendTabMessage');
    const getLocalStorage = require('../utils/getLocalStorage');
    const loadingImage = require('./assets/images/loading.gif');
    const getTwitterTab = require('../utils/getTwitterTab');
    const fetchBlocks = require('../utils/fetchBlocks');
    const calculateBlock = require('../utils/calculateBlock');

    let twitterTab;

    let status = null;
    let loading = true;
    let session = null;
    let currentBlocks = null;
    let blocks = null;
    let blocking = null;
    let remaining = null;


    (async () => {
        chrome.storage.onChanged.addListener(async (data, storageType) => {
            if (data['processing']) await syncBlock(data['processing']);
            if (data['ignore']) {
                const calculate = await calculateBlock();
                blocks = calculate.blocks;
            }
        });

        const calculate = await calculateBlock();
        if (!calculate || (calculate.error && calculate.error === 1)) {
            loading = false;
            session = false;
            return;
        }
        session = calculate.user;
        currentBlocks = calculate.current;
        blocks = calculate.blocks;
        blocking = calculate.blocking;
        loading = false;

        const processing = await getLocalStorage('processing');

        if (processing && processing.data.length > 0) {
            status = 1;
            remaining = processing.data.length;
        } else if (Array.isArray(blocking) && blocking.length > 0) {
            status = 2;
        } else {
            status = 3;
        }
    })();

    $: (() => {
        chrome.action.setBadgeText({
            text : (remaining === null || remaining === 0)
                ? ((blocking === null || blocking.length === 0)
                    ? ''
                    : String(blocking.length))
                : String(remaining)
        });

        if (!blocks || (Array.isArray(blocks) && blocks.length === 0)) {
            blocking = [];
            remaining = 0;
            status = 3;
        }
    })();


    function handleLogin() {
        chrome.tabs.create({
            url    : 'https://twitter.com/login',
            active : true
        });
    }

    async function handleBlock() {
        if (!blocking) return;
        status = 1;

        chrome.storage.local.set({
            processing : {
                status : 1,
                data   : blocking
            }
        });
    }

    async function handleCancelBlock() {
        status = null;
        currentBlocks = null;
        blocks = null;
        blocking = null;

        const calculate = await calculateBlock();
        blocks = calculate.blocks;
        currentBlocks = calculate.current;
        blocking = calculate.blocking;
        status = blocking.length > 0 ? 2 : 3;
        remaining = blocking.length;
        chrome.storage.local.remove('processing');
    }

    async function syncBlock(data) {
        if (!data) return;
        let processingNew = data.hasOwnProperty('newValue') ? data['newValue'] : null;
        let processingOld = data.hasOwnProperty('oldValue') ? data['oldValue'] : null;

        if (!processingNew && processingOld) return;

        if (processingNew && processingNew.hasOwnProperty('data') && processingNew.data.length > 0) {
            remaining = processingNew.data.length;
            status = 1;
            return true;
        } else {
            return handleCancelBlock();
        }
    }


</script>


