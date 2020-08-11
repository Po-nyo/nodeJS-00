let express = require('express');
let bodyParser = require('body-parser');
let main = require('./router/main');
let email = require('./router/email');

let app = express();

app.listen(3000, function() {
    console.log("server started at port 3000!");
});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', main);
app.use('/email', email);

