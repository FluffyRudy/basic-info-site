const { sleep } = require("../utils/sleep.cjs");


module.exports = {
    getUser: async function (req, res) {
        await sleep(3);
        res.send("User: hokage dattebayo");
    }
}