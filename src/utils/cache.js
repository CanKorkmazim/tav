const getLocalStorage = require('./getLocalStorage');

module.exports = class {
    static async get(key) {

        const data = await getLocalStorage(key)

        if (data) {
            let currentDate = new Date();
            let expireDate = new Date(data.expire);

            if (!(currentDate > expireDate)) return data.data;

            chrome.storage.local.remove(key);
            return null;
        }

        return null;
    }

    static async has(key) {
        return !!await this.get(key);
    }
    static async set(key, value, expire) {
        let expireDate = new Date();
        let set = {};
        expireDate.setSeconds(expireDate.getSeconds() + expire);
        set[key] = {data: value, expire: expireDate.toString()};
        chrome.storage.local.set(set)
    }
}