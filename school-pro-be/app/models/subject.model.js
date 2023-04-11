const db = require("./db.js");
module.exports = class Subject {
    constructor(id, name, description, noOfESP, yearOfStudy, semester) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.noOfESP = noOfESP;
        this.yearOfStudy = yearOfStudy;
        this.semester = semester;

    }

    static fetchAll() {
        return db.execute('SELECT * FROM subject');
    }

    static post(name,description,noOfESP,yearOfStudy,semester) {
        return db.execute('INSERT INTO subject (name,description,noOfESP,yearOfStudy,semester) VALUES (?, ?, ?, ?, ?)', [name, description,noOfESP,yearOfStudy, semester]);
    }

    static update(id,name,description,noOfESP,yearOfStudy,semester) {
        return db.execute('UPDATE subject SET  name=?, description=?, noOfESP=?, yearOfStudy=?, semester=? WHERE id = ?', [name,description,noOfESP,yearOfStudy,semester,id]);
    }

    static delete(id) {
        return db.execute('DELETE FROM subject WHERE id = ?', [id]);
    }
};
