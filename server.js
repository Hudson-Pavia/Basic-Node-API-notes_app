const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const boydParser = require("body-parser");
const db = require("./config/db");

const app = express();

const port = 8000;

app.use(boydParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  //connects to the database with the url, also passes an error checking function
  if (err) return console.log(err); //error checking
  require("./app/routes")(app, database); //not entirely sure what this does. I think it has to do with listening for requests
  app.listen(port, () => {
    console.log(`we are live on ${port}`); //once the server is live, display the port name
  });
});
