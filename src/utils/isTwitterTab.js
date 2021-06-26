module.exports = ({url}) => {
    try {
        const {host} = new URL(url);
        return host === 'twitter.com' || host === 'www.twitter.com'
    } catch (e) {
        return false;
    }
}