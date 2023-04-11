const mysql = require("mysql2");
const config = require("../config/db.config.js");
 
const db  = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});
 
db.connect(err => {
    if (err) { console.log(err, 'dberr'); }
    console.log('database connected ...');
})

module.exports = db.promise();

