var ObjectID = require("mongodb").ObjectID; //for turning the id string into and Object id (needed by Mongo)
module.exports = function (app, db) {
  //route for reading a note that lives in the DB
  app.get("/notes/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) }; //elemnt we want from db. MongoDB requires an ID as an object
    db.db()
      .collection("notes")
      .findOne(details, (err, item) => {
        //retrieving the element we want
        if (err) {
          res.send({ error: "An error has occurred" });
        } else {
          res.send(item);
        }
      });
  });
  //
  //
  //route for posting a new note to the db
  app.post("/notes", (req, res) => {
    // ^^^for the notes collection as delimenated by "/notes". also pass a  callback function with params request and response (req, res)
    const note = { text: req.body.body, title: req.body.title }; //the note json contains the text and title of the note sent by the client
    db.db()
      .collection("notes")
      .insert(note, (err, results) => {
        //[database var].db().collection.inserts the note object into the mongoDB
        if (err) {
          //the following is error checking
          res.send({ error: "An error has occured" }); //either send an error message back to the client
        } else {
          res.send(results.ops[0]); //or send the result of the insertion back to the client
        }
      });
  });
  //
  //
  //
  //route for deleting a note
  app.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) }; //element we want from db. MongoDB requires an ID as an object
    db.db()
      .collection("notes")
      .remove(details, (err, item) => {
        //^^^removing the element we want
        if (err) {
          res.send({ error: "An error has occured" });
        } else {
          res.send("Note " + id + " deleted.");
        }
      });
  });
  //
  //
  //
  //route for updating (AKA put)
  app.put("/notes/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) }; //elemnt we want from db. MongoDB requires an ID as an object
    const note = { text: req.body.body, title: req.body.title };
    db.db()
      .collection("notes")
      .update(details, note, (err, item) => {
        //retrieving the element we want
        if (err) {
          res.send({ error: "An error has occured" });
        } else {
          res.send(item);
        }
      });
  });
  //
  //
  app.post("/notes", (req, res) => {
    // ^^^for the notes collection as delineated by "/notes". also pass a  callback function with params request and response (req, res)
    const note = { text: req.body.body, title: req.body.title }; //the note json contains the text and title of the note sent by the client
    db.db()
      .collection("notes")
      .insert(note, (err, results) => {
        //[database var].db().collection.inserts the note object into the mongoDB
        if (err) {
          //the following is error checking
          res.send({ error: "An error has occured" }); //either send an error message back to the client
        } else {
          res.send(results.ops[0]); //or send the result of the insertion back to the client
        }
      });
  });
};
