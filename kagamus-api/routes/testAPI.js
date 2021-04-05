var express = require("express");
var router = express.Router();

router.get("/testAPI", function(req, res, next) {
    res.send("ez");
});

module.exports = router;