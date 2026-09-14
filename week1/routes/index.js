const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Grandma Nellie");
});

module.exports = router;