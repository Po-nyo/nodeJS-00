let express = require('express');
let router = express.Router();
let path = require('path');

let email = require('./email/email');
let accounts = require('./accounts/accounts')

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
});

router.use('/email', email)
router.use('/accounts', accounts)

module.exports = router;