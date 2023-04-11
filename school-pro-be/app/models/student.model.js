const db = require("./db.js");
module.exports = class Student {
    constructor(id, indexNumber, indexYear, firstName, lastName, email, adress, city, currentYearOfStudy) {
        this.id = id;
        this.indexNumber = indexNumber;
        this.indexYear = indexYear;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.adress = adress;
        this.city = city;
        this.currentYearOfStudy = currentYearOfStudy;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM student');
    }

    static post(indexNumber, indexYear, firstName, lastName, email, adress, city, currentYearOfStudy) {
        return db.execute('INSERT INTO student (indexNumber,indexYear,firstName,lastName,email,adress,city,currentYearOfStudy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [indexNumber, indexYear, firstName, lastName, email, adress, city, currentYearOfStudy]);
    }

    static update(id,indexNumber, indexYear, firstName, lastName, email, adress, city, currentYearOfStudy) {
        return db.execute('UPDATE student SET  indexNumber=?,indexYear=?,firstName=?,lastName=?,email=?,adress=?,city=?,currentYearOfStudy= ? WHERE id = ?', [indexNumber, indexYear, firstName, lastName, email, adress, city, currentYearOfStudy, id]);
    }

    static delete(id) {
        return db.execute('DELETE FROM student WHERE id = ?', [id]);
    }
};

