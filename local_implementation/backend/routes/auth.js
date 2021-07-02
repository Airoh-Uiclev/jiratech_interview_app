const express = require("express");


const app = express();
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/register", authController.register );//{
    // console.log("HTTP request for /auth/register endpoint");
//});

router.post("/login", authController.login);

// router.post("/register", (req, res) => {
//     console.log("Post request for /auth/register endpoint");
// });

router.get("/register", (req, res) => {
    console.log("Get req made on /auth/register");
    console.log(req.body);
    res.send("<h1>Get req</h1>")
});

module.exports = router;