var express = require('express');
var router = express.Router();
var rq = require('request');

var MongoClient = require('mongodb').MongoClient;
var urls = "mongodb+srv://kagamus_admin:vOsASAZMOq3JFkii@cluster0.ohyri.mongodb.net/test";
var ObjectId = require('mongodb').ObjectID;

router.get('/', function (req, res, next) {

    // var jsonString = req.body;
    // var jsonRequest = JSON.parse(JSON.stringify(jsonString));
    var id = req.query['id'];

    var query = {_id: ObjectId(id)}

    MongoClient.connect(urls, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("AnimeList");

        dbo.collection("myLists").find(query).limit(1).next(function(err, doc){
            // handle data
            console.log(err);
            console.log(doc);
            res.send(doc);
         })
       
     
        
    });


});

module.exports = router;
