const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')

// database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'test',
    database: 'test_db'
})

connection.connect()


let app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

app.listen(3000, function() {
    console.log("server started at port 3000!");
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/main.html");
})

app.get('/form', function(req, res) {
    res.sendFile(__dirname + "/public/form.html");
})

app.post('/email_post', function(req, res) {
    res.render('email.ejs', {
        'email': req.body.email,
    })
});


app.post('/ajax_send_email', function(req, res) {
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
