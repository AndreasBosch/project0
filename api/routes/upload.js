const mysql = require('../config/mysql.js');
const multer = require('multer');
const path = require('path')
// Set Storage Engine
const storage = multer.diskStorage({
    destination: path.join(__dirname, "..", "public", "uploads"),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

// init Upload
const Upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

// Check File Type

function checkFileType(file, cb) {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // check the extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // check the mimetypes
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error: Images only!')
    }

}




module.exports = (app) => {
    app.post('/upload', (req, res) => {
        Upload(req, res, (err) => {
            if (err) {
                res.render('profile', {
                    msg: err
                });
            } else {
                if (req.file == undefined) {
                    res.render('profile', {
                        msg: 'Error, no file selected!'
                    })
                } else {
                    let successFile = req.file.filename
                    let db = mysql.connect();
                    db.execute("INSERT INTO profile SET profile_image = ? ", [successFile], (err, rows) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500)
                        } else {

                            res.json(rows)
                        }
                    })

                }
            }
        });
    })


}