const db = require("./db.js");
module.exports = class Literature {
    constructor(id, name, author, profesor, issn) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.profesor= profesor;
        this.issn = issn;
 
    }

    static fetchAll() {
        return db.execute('SELECT * FROM literature');
    }

    static post(name, author, profesor, issn) {
        return db.execute('INSERT INTO literature (name, author, profesor, issn) VALUES (?, ?, ?, ?)', [name, author, profesor, issn]);
    }

    static update(id,name, author, profesor, issn) {
        return db.execute('UPDATE literature SET  name=?, author=?, profesor=?, issn=? WHERE id = ?', [name, author, profesor, issn,id]);
    }

    static delete(id) {
        return db.execute('DELETE FROM literature WHERE id = ?', [id]);
    }
};
 