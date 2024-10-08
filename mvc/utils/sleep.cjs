/**
 * Pauses execution for a specified amount of time.
 *
 * @param {number} time - The amount of time to sleep in seconds.
 * @returns {Promise<void>} A promise that resolves after the specified time.
 */
async function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, time * 1000.0);
    });
}

module.exports = { sleep }