let express = require('express');
let router = express.Router();
let path = require('path');

let email = require('./email');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
});

router.use('/email', email)

module.exports = router;