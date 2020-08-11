let express = require('express');
let bodyParser = require('body-parser');
let router = require('./router/index');
let passport = require('passport');
let session = require('express-session');
let flash = require('connect-flash');

let app = express();

app.listen(3000, function() {
    console.log("server started at port 3000!");
});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(router);

