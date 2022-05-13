const db = require('../db/connection.js');


function getAllDepartments() {
        const sql = `
        SELECT * FROM departments;
        `;
        db.query(sql, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            console.table(rows);
            console.log('\n')
        });
};

module.exports = { 
    getAllDepartments,
};