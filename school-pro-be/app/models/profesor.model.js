const db = require("./db.js");
module.exports = class Profesor {
  constructor(id, firstName, lastName, email, adress, city, phone,reelectionDate, title, subject) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.adress = adress;
    this.city = city;
    this.phone = phone;
    this.reelectionDate = reelectionDate;
    this.title = title;
    this.subject = subject;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM profesor');
  }

  static post(firstName, lastName, email, adress, city, phone, reelectionDate, title, subject) {
    return db.execute('INSERT INTO profesor (firstName,lastName,email,adress,city,phone,reelectionDate,title,subject) VALUES (?,?,?,?,?,?,?,?,? )', [firstName, lastName, email, adress, city, phone, reelectionDate, title, subject]);
  }

  static update(id,firstName, lastName, email, adress, city, phone, reelectionDate, title, subject) {
    return db.execute('UPDATE profesor SET  firstName= ?, lastName= ?, email= ?, adress= ?, city= ?, phone=?, reelectionDate= ?, title= ?, subject= ? WHERE id = ?', [firstName, lastName, email, adress, city, phone, reelectionDate, title, subject,id]);
  }

  static delete(id) {
    return db.execute('DELETE FROM profesor WHERE id = ?', [id]);
  }
};
