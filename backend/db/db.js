var pgp = require("pg-promise")();
var connectionString = "postgres://localhost:5432/choral";
var db = pgp(connectionString);

module.exports = db