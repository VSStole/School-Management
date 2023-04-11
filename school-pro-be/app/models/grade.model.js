const db = require("./db.js");
module.exports = class Grade {
    constructor(id, student, subject, profesor, grade) {
        this.id = id;
        this.student = student;
        this.subject = subject;
        this.profesor = profesor;
        this.grade = grade;
        

    }

    static fetchAll() {
        return db.execute('SELECT * FROM grades');
    }

    static post(student, subject, profesor, grade) {
        return db.execute('INSERT INTO grades (student, subject, profesor, grade) VALUES (?, ?, ?, ?)', [student, subject, profesor, grade]);
    }

    static update(id,student, subject, profesor, grade) {
        return db.execute('UPDATE grades SET  student=?, subject=?, profesor=?, grade=? WHERE id = ?', [student, subject, profesor, grade, id]);
    }

    static delete(id) {
        return db.execute('DELETE FROM grades WHERE id = ?', [id]);
    }
};
