// const express = require("express");
// const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("Grandma Nellie");
// });

// router.get("/grandpa", (req, res) => {
//     res.send("Grandpa Barnes");
// });

// module.exports = router;

const nellieRoute = (req, res) => {
    res.send("Grandma Nellie");
};

const grandpaRoute = (req, res) => {
    res.send("Grandpa Barnes");
};

module.exports = {
    nellieRoute, 
    grandpaRoute
};