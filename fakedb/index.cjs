const express = require("express");
const { fakeDB } = require("./controller.cjs");


const app = express();

app.get('/', (req, res) => {
    const data = [
        "(neji dying)",
        "neji: Hina... hinata",
        "hinata: Naruto kun......(love)",
        "naruto: Hokage dattebayo",
    ].map(elem => `<h1>${elem}</h1>`).join('')
    res.send(data);
})

app.get('/users/create/:username/:email', async (req, res, next) => {
    const data = req.params;
    const username = data.username;
    const id = fakeDB.nextID;
    const email = data.email;
    if (!username || !email || username.length < 4) {
        const error = new Error("Bad request expected valid data");
        error.status = 400
        next(error);
    } else {
        await fakeDB.createUser(username, email);
        res.send(`user created successfully username: ${username}, email: ${email}`);
        console.log(await fakeDB.getUser(id))
    }
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(`${err.message}, status: ${err.status}` || "internal server error");
})

app.listen(3000, () => {
    console.log("Listening at: http://localhost:3000");
})