
const db = require("./db.js");


/* Exporting the class User to be used in other files. */
module.exports = class User {
    constructor(name, email, password) {
      this.name = name;
      this.email = email;
      this.password = password;
    }
  
    static find(email) {
      return db.execute('SELECT * FROM user WHERE email = ?', [email]);
    }
  
    static save(user) {
      return db.execute(
        'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
        [user.name, user.email, user.password]
      );
    }
  };
