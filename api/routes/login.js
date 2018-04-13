const mysql = require('../config/mysql.js');
const jwt = require('../config/jwt.js');

module.exports = (app) => {
    app.post('/api/login', (req, res) => {

        let email = req.body.email;
        if (email == undefined) {
            email = '';
        }
        let password = req.body.password;
        if (password == undefined) {
            password = ''
        }

        if (email == '' || password == '') {
            res.sendStatus(400); // BAD REQUEST
        } else {
            let db = mysql.connect();
            db.execute('SELECT profile_id, profile_name, profile_email FROM profile WHERE profile_email = ? AND profile_password = ? ', [email, password], (err, rows) => {
                if (err) {
                    console.log(err.message);
                    res.sendStatus(500);// internal server error
                } else {
                    // hvis rows.lenght er lig med 1 så er der en bruger
                    if (rows.length == 1) {
                        let token = jwt.create({
                            "profile_id": rows[0].profile_id

                        });
                        res.json({
                            "token": token

                        });
                    } else {
                        // ingen bruger fundet
                        res.sendStatus(401);
                    }
                }
            });
            db.end();
        }
    });

    app.post('/api/register', (req, res) => {

        let email = req.body.email;
        if (email == undefined) {
            email = ''
        }


        let username = req.body.username;
        if (username == undefined) {
            username == '';
        }
        let password = req.body.password;
        if (password == undefined) {
            password = ''
        }

        if (email == '' || username == '' || password == '') {
            res.sendStatus(400); // BAD REQUEST
        } else {
            let db = mysql.connect();
            db.execute('INSERT INTO profile SET profile_email = ?, profile_password = ?, profile_name = ?', [email, password, username], (err, rows) => {
                if (err) {
                    console.log(err.message);
                    res.sendStatus(500);// internal server error
                } else {
                    res.json(rows)
                }
            });
            db.end();
        }
    })

}