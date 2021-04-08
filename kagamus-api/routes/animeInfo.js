var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');

router.get("/", function(req, res, next) {
    var animeId = req.query['id'];
    fetch(`https://api.myanimelist.net/v0/anime/${animeId}?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,nsfw,created_at,updated_at,status,genres,num_episodes,start_season,broadcast,source,pictures,background,related_anime,recommendations`)
        .then(response => response.json())
        .then(data => {
            res.send(data);
        });
});

module.exports = router;