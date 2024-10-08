const express = require("express");
const { userRouter } = require("./routes/User.cjs");


const PORT = 3000;

const app = express();

const userRoute = userRouter;

app.use('/user', userRoute);

app.use("/", (req, res) => {
    res.send("Root page");
})

app.use((err, req, res, next) => {
    res.send(err.messsage);
})

app.listen(PORT, () => {
    console.log(`Listenng at http://127.0.0.1:${PORT}`);
})