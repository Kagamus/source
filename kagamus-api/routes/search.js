var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');

router.get("/", function(req, res, next) {
    var searchQuery = req.query['anime'];
    // var result;
    fetch(`https://api.myanimelist.net/v0/anime?q=${searchQuery}&limit=10`)
        .then(response => response.json())
        .then(data => {
            var result = (data['data'])
            res.send(result);
        });
});

module.exports = router;