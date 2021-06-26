module.exports = (millisecond, cb) => {
    const timer = new Promise((resolve, reject) =>
        setTimeout(() => resolve(false), millisecond)
    );

    return Promise.race([
        cb,
        timer
    ]);
};