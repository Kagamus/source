var express = require('express');
var router = express.Router();
var rq = require('request');

var MongoClient = require('mongodb').MongoClient;
var urls = "mongodb+srv://kagamus_admin:vOsASAZMOq3JFkii@cluster0.ohyri.mongodb.net/test";


router.post('/', function (req, res, next) {


    var jsonString = req.body;
    var jsonRequest = JSON.parse(JSON.stringify(jsonString));
    var query = {Genre : jsonRequest.Genre, username : jsonRequest.username, AnimeListTitle : jsonRequest.AnimeListTitle, AnimeList : jsonRequest.AnimeList}

  

  MongoClient.connect(urls, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("AnimeList");

    dbo.collection("myLists").insert(query);
    res.send(query);
    
  });
});


router.post('/deleteList', function (req, res, next) {

  var jsonString = req.body;
  var jsonRequest = JSON.parse(JSON.stringify(jsonString));
  console.log(jsonRequest);

  res.send(query);


});

module.exports = router;
