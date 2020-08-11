let express = require('express');
let bodyParser = require('body-parser');
let mysql = require('mysql');
let main = require('./router/main');
let form = require('./router/form');
let email_post = require('./router/email_post');

// database connection
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'test',
    database: 'test_db'
});

connection.connect();


let app = express();

app.listen(3000, function() {
    console.log("server started at port 3000!");
});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', main);
app.use('/form', form);
app.use('/email_post', email_post);

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
