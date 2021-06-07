const noteRoutes = require("./note_routes");
//entry point
// runs the CRUD functions defined in note_routes (create, read, update, delete)
module.exports = function (app, db) {
  noteRoutes(app, db);
};
