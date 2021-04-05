var express = require("express");
var router = express.Router();
var SHA256 = require("crypto-js/sha256");

var MongoClient = require('mongodb').MongoClient;
const { move } = require("./users");
var resultLength = 0; 
let returnString = "Invalid";
const dbUrl = "mongodb+srv://kagamus_admin:vOsASAZMOq3JFkii@cluster0.ohyri.mongodb.net/test";
function setString(string) {
  returnString = string;
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
    const database = client.db("AnimeList");
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

