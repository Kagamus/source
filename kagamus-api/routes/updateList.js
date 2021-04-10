var express = require('express');
var router = express.Router();
var rq = require('request');

var MongoClient = require('mongodb').MongoClient;
var urls = "mongodb+srv://kagamus_admin:vOsASAZMOq3JFkii@cluster0.ohyri.mongodb.net/test";
var ObjectId = require('mongodb').ObjectID;


router.post('/', function (req, res, next) {

  var jsonString = req.body;
  var jsonRequest = JSON.parse(JSON.stringify(jsonString));
  var id = jsonRequest._id;
  console.log(id);
  var query = {Genre : jsonRequest.Genre, username : jsonRequest.username, AnimeListTitle : jsonRequest.AnimeListTitle, AnimeList : jsonRequest.AnimeList}


  MongoClient.connect(urls, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("AnimeList");
    
    try {
      dbo.collection("myLists").updateOne({_id : ObjectId(id)}, {$set : query});
    } catch (error) {
      dbo.collection("myLists").updateOne({_id : ObjectId(id["$oid"])}, {$set : query});
    }
    
    res.send(query);
    
  });


});

module.exports = router;
