const mysql = require('../config/mysql.js');
const jwt = require('../config/jwt.js');

module.exports = (app) => {

    app.get('/api/profile', (req, res) => {

        let token = jwt.open(req.headers.token);
        if (token === false) {
            res.sendStatus(403); // forbidden
        } else {
            let db = mysql.connect();
            db.execute(`SELECT profile_name, profile_email FROM profile where profile_id = ? `, [token.profile_id], (err, rows) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.json(rows[0])
                }
            })
        }
    })


}
// SEND TOKEN MED I HEADERS ELLERS VIRKER DET IKKE KAMMERAT! 
