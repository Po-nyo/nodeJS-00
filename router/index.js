let express = require('express');
let router = express.Router();

let email = require('./email/email');
let accounts = require('./accounts/accounts')

router.get('/', function(req, res) {
    console.log('main loaded : ', req.user)
    if(!req.user)
        res.render('sign_in.ejs')
    else
        res.render('main.ejs',{
            'id': req.user
        })
});

router.use('/email', email)
router.use('/accounts', accounts)

module.exports = router;