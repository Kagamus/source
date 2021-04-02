var express = require("express");
var router = express.Router();
var SHA256 = require("crypto-js/sha256");

var MongoClient = require('mongodb').MongoClient;
const { move } = require("./users");
var resultLength = 0; 
let returnString = "Invalid";
const dbUrl = "mongodb://localhost:27017/";
function setString(string) {
  returnString = string;
} 
function processEntry(query) {
    
    MongoClient.connect(dbUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Kagamus");
        // var myObj = { user: userName, password: hashedPassword};
        dbo.collection("users").find(query).toArray(function(err, result) {
              if (err) throw err;
              
              
              if (result.length.valueOf() == 0) {
                console.log(result.length+" == "+"0");
                console.log("inside short");
                console.log("--------------------------------");
                setString("Invalid Username or Password");
                //   resultLength += 1;  
              } else {
                console.log("else:" + result);
                setString("GoodToGo");
              }
              db.close();
        });
    
    
    });
}


router.get("/", function(req, res, next) {
  
    var password = req.query.pwd;
    var userName = req.query.usr;
    // var hashedPassword = SHA256(password).toString();
    var query = { user: userName };
    // console.log(query);
    // var resultsArray = [];
    // processEntry(query);
    console.log(userName+" "+password);
    run(userName,password,res).catch(console.dir);
    console.log("Processed Entry: ", returnString);
    
    
    returnString = "Invalid";
});


async function run(userName,userPwd,res) {
  const client = new MongoClient(dbUrl);
  try {
    await client.connect();
    const database = client.db("Kagamus");
    const usersColl = database.collection("users");
    // Query for a movie that has the title 'The Room'
    const query = { user: userName };
    // const options = {
    //   // sort matched documents in descending order by rating
    //   sort: { rating: -1 },
    //   // Include only the `title` and `imdb` fields in the returned document
    //   projection: { _id: 0, title: 1, imdb: 1 },
    // };
    const users = await usersColl.find(query).toArray();
    // since this method returns the matched document, not a cursor, print it directly
      // console.log(users[0]+" "+users.length);
      // console.log(users);
    if(users.length > 0) {
      // console.log(users[0].password === userPwd);
      if(users[0].password === SHA256(userPwd).toString()){
        setString("GoodToGo");
      }
    }
  } finally {
    res.send(returnString);
    await client.close();
  }
}
module.exports = router;

