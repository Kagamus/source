var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var urls = "mongodb+srv://kagamus_admin:vOsASAZMOq3JFkii@cluster0.ohyri.mongodb.net/test";

router.get('/', function (req, res, next) {

  var keyword = req.query['keyword']
  var genre = req.query['genre']
  var result = [];

  if (keyword == "" && genre == "") {
    var query = {};
  } else if (keyword == "") {
    var query = { Genre: genre };
  } else if (genre == "") {
    var query = { $text: { $search: keyword } }
  } else {
    var query = { $text: { $search: keyword }, Genre: genre };
  }

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
      }
      temp != [] ? result.push(temp) : null;

      res.send(result);
      db.close();
    });
  });
});

module.exports = router;
