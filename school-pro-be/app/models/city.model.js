const db = require("./db.js");
module.exports = class City {
    constructor(zip_code, name) {
        this.zip_code = zip_code;
        this.name = name;

    }

    static fetchAll() {
        return db.execute('SELECT * FROM city');
    }
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    static post(zip_code,name) {
        return db.execute('INSERT INTO city (zip_code,name) VALUES (?,?)', [zip_code,name]);
    }

    static update(zip_code,name) {
        return db.execute('UPDATE city SET    name= ? WHERE zip_code = ?', [ name,zip_code]);
    }

    static delete(zip_code) {
        return db.execute('DELETE FROM city WHERE zip_code = ?', [zip_code]);
    }
};
