let express = require('express');
let router = express.Router();
let path = require('path')
let mysql = require('mysql');

// DATABASE SETTINGS
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'test',
    database: 'test_db'
});

connection.connect();

router.get('/join', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/join.html'));
})

router.post('/join', function(req, res) {
    const body = req.body;
    const name = body.name;
    const pw = body.pw;
    const email = body.email;

    let sql = {name: name, pw: pw, email: email}
    connection.query('INSERT INTO user set ?', sql,
        function(err, rows) {
            if(err)
                throw err;
            else {
                console.log("insert ok", rows);
                res.render('welcome.ejs', {
                    'id': rows.insertId,
                    'name': name,
                })
            }
        })
})

module.exports = router;