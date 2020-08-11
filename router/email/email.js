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

// ROUTER
router.get('', function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/form.html"));
});

router.post('/email_post', function(req, res) {
    res.render('email.ejs', {
        'email': req.body.email,
    })
});

router.post('/ajax', function(req, res) {
    const email = req.body.email;
    console.log(email);

    let responseData = {}

    connection.query('SELECT name FROM user WHERE email="' + email +'"', function(err, rows) {
        if(err) throw err;
        if(rows[0]) {
            console.log(rows[0]);
            responseData.result = 'ok';
            responseData.name = rows[0].name;
        }
        else {
            responseData.result = 'none';
            responseData.name = '';
            console.log('none: ' + rows[0]);
        }
        res.json(responseData)
    })
})

module.exports = router;