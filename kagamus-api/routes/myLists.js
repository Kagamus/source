var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var urls = "mongodb+srv://kagamus_admin:vOsASAZMOq3JFkii@cluster0.ohyri.mongodb.net/test";

router.get('/', function (req, res, next) {

  var userName = req.query.user;
  var result = [];
    console.log(userName);
  var query = {username: userName}
  

  MongoClient.connect(urls, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("AnimeList");

    dbo.collection("myLists").find(query).toArray(function (err, fetch_data) {
      if (err) throw err;
      // console.log(result);
      temp = [];
      for (i = 0; i < fetch_data.length; i++) {
        if (i % 3 == 0) {
          i != 0 ? result.push(temp) : null;
          temp = [];
        }
        temp.push(fetch_data[i])
        console.log("temp ",i,": ",result);
      }
      temp != [] ? result.push(temp) : null;
      console.log("result: ",result);
      res.send(result);
      db.close();
    });
  });
});

module.exports = router;
