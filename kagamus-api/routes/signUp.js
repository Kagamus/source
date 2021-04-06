var express = require("express");
var router = express.Router();
var SHA256 = require("crypto-js/sha256");

var MongoClient = require('mongodb').MongoClient;
const { move } = require("./users");
var resultLength = 0;
let returnString = "Un-inserted";
const dbUrl = "mongodb+srv://kagamus_admin:vOsASAZMOq3JFkii@cluster0.ohyri.mongodb.net/test";
function setString(string) {
  returnString = string;
}

router.get("/", function (req, res, next) {

  var password = req.query.pwd;
  var userName = req.query.usr;
  var passwordConf = req.query.pwdConf;
  var email = req.query.eml;
  var query = { user: userName };
  console.log(userName + " " + password);
  run(userName, email, password, res).catch(console.dir);

  returnString = "Un-inserted";
});


async function run(userName, userEml, userPwd, res) {
  const client = new MongoClient(dbUrl);
  try {
    await client.connect();
    const database = client.db("AnimeList");
    const usersColl = database.collection("users");
    const userQuery = { user: userName };
    const emailQuery = { email: userEml };
    const hashedPassword = SHA256(userPwd).toString();
    const userObj = { user: userName, email: userEml, password: hashedPassword }

    const users = await usersColl.find(userQuery).toArray();
    const email = await usersColl.find(emailQuery).toArray();

    if (users.length > 0 && email.length > 0) {
      setString("Account already exists with that Email");
    } else if (email.length > 0) {
      setString("Account already exists with that Email");
    } else if (users.length > 0) {
      setString("Account already exists with that Username");
    } else {
      usersColl.insertOne(userObj);
      setString("Inserted");
    }

  } finally {
    console.log("Finally: ", returnString);
    res.send(returnString);
    await client.close();
  }
}

module.exports = router;