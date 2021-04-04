var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var urls = "mongodb://localhost:27017/";


/* GET home page. */
// router.get('/', function(req, res, next) {
  
//   MongoClient.connect(urls,{ useUnifiedTopology: true }, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("myanimelists");
//     dbo.collection("animelists").find({}).toArray(function(err, result) {
//       if (err) throw err;
//       console.log(result);
//       res.send(result);
//       db.close();
//     });
//   });
// });


router.get('/', function(req, res, next) {

  var keyword = req.query['keyword']
  var genre = req.query['genre']

 
  if (keyword == "" && genre == ""){
    var query = {}
    
  }else if(keyword == ""){
    
    var query = {Genre : genre}

  }else if(genre == ""){

    var query = { $text: { $search: keyword }}
  }
  else{
    var query = { $text: { $search: keyword } , Genre : genre}
  }
  
  
  MongoClient.connect(urls,{ useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myanimelists");
    
    dbo.collection("animelists").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});



module.exports = router;
