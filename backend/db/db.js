var pgp = require("pg-promise")();
var connectionString = "postgres://localhost:5432/choral" || process.env.DATABASE_URL;
var db = pgp(connectionString);

module.exports = db