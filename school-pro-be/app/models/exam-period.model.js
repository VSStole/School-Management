const db = require("./db.js");
module.exports = class Examperiod {
    constructor(id,name, startexam, finishexam, quarter) {
        this.id = id;
        this.name = name;
        this.startexam = startexam;
        this.finishexam = finishexam;
        this.quarter = quarter;
    

    }

    static fetchAll() {
        return db.execute('SELECT * FROM examperiod');
    }

    static post(name,startexam,finishexam,quarter) {
        return db.execute('INSERT INTO examperiod (name,startexam,finishexam,quarter) VALUES (?,?,?,?)', [name,startexam,finishexam,quarter]);
    }

    static update(id,name,startexam,finishexam,quarter) {
        return db.execute('UPDATE examperiod SET  name=?, startexam=?, finishexam=?, quarter=?  WHERE id = ?', [name,startexam,finishexam,quarter,id]);
    }

    static delete(id) {
        return db.execute('DELETE FROM examperiod WHERE id = ?', [id]);
    }
};
