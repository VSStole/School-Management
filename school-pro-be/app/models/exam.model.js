const db = require("./db.js");
module.exports = class Exam {
    constructor(id, subject,profesor,student,examperiod,city,dateOfExam) {
        this.id = id;
        this.subject = subject;
        this.profesor = profesor;
        this.student = student;
        this.examperiod = examperiod;
        this.city = city;
        this.dateOfExam = dateOfExam;

    }

    static fetchAll() {
        return db.execute('SELECT * FROM exam');
    }

    static post(subject,profesor,student,examperiod,city,dateOfExam) {
        return db.execute('INSERT INTO exam (subject,profesor,student,examperiod,city,dateOfExam) VALUES (?, ?, ?, ?, ?, ?)', [subject,profesor,student,examperiod,city,dateOfExam]);
    }

    static update(id,subject,profesor,student,examperiod,city,dateOfExam) {
        return db.execute('UPDATE exam SET  subject=?, profesor=?, student=?, examperiod=?, city=?, dateOfExam=? WHERE id = ?', [subject,profesor,student,examperiod,city,dateOfExam,id]);
    }

    static delete(id) {
        return db.execute('DELETE FROM exam WHERE id = ?', [id]);
    }
};
