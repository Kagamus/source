var express = require("express");
var router = express.Router();
var SHA256 = require("crypto-js/sha256");

var MongoClient = require('mongodb').MongoClient;
const { move } = require("./users");
let returnString = "Invalid";
const dbUrl = "mongodb+srv://kagamus_admin:vOsASAZMOq3JFkii@cluster0.ohyri.mongodb.net/test";
function setString(string) {
  returnString = string;
}

router.get("/", function (req, res, next) {

  var password = req.query.pwd;
  var userName = req.query.usr;
  var query = { user: userName };
  console.log(userName + " " + password);
  run(userName, password, res).catch(console.dir);
  console.log("Processed Entry: ", returnString);
  returnString = "Invalid";
});

async function run(userName, userPwd, res) {
  const client = new MongoClient(dbUrl);
  try {
    await client.connect();
    const database = client.db("AnimeList");
    const usersColl = database.collection("users");
    const query = { user: userName };
    const users = await usersColl.find(query).toArray();

    if (users.length > 0) {
      if (users[0].password === SHA256(userPwd).toString()) {
        setString("GoodToGo");
      }
    }
  } finally {
    res.send(returnString);
    await client.close();
  }
}

module.exports = router;