var express = require('express');
var bodyParser = require('body-parser');

var app = express();

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
    console.log(req.body.email);
    let responseData = {'result': 'ok', 'email': req.body.email}
    res.json(responseData)
})
