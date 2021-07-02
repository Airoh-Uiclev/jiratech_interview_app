const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("HTTP request for root endpoint");
    res.send("<h1>Home Page</h1>")
});

module.exports = router;