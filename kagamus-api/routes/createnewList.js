var express = require('express');
var router = express.Router();
var rq = require('request');

var MongoClient = require('mongodb').MongoClient;
var urls = "mongodb://localhost:27017/";

router.get('/', function (req, res, next) {

    var jsonRequest = req.body;


    var query = {Genre : jsonRequest.Genre, username : jsonRequest.username, AnimeListTitle : jsonRequest.AnimeListTitle, AnimeList : jsonRequest.AnimeList}


  MongoClient.connect(urls, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("AnimeList");

    dbo.collection("myLists").insert(query);
    res.send(query);
    
  });
});

module.exports = router;
