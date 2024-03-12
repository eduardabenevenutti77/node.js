const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Word :) ");
})

app.listen(3000, () => {
    console.log("O servidor está usando a porta 3000!");
})