var express = require('express');
var router = express.Router();
var rq = require('request');

var MongoClient = require('mongodb').MongoClient;
var urls = "mongodb://localhost:27017/";


router.post('/', function (req, res, next) {

    var jsonString = req.body;
    var jsonRequest = JSON.parse(JSON.stringify(jsonString));
    var query = {Genre : jsonRequest.Genre, username : jsonRequest.username, AnimeListTitle : jsonRequest.AnimeListTitle, AnimeList : jsonRequest.AnimeList}

    MongoClient.connect(urls, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("AnimeList");

        dbo.collection("myLists").find(query).limit(1).next(function(err, doc){
            // handle data
            console.log(err);
            console.log(doc);
            res.send(objectID(doc._id));
         })
       
     
        
    });


});

module.exports = router;
