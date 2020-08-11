let express = require('express');
let router = express.Router();

router.post('', function(req, res) {
    res.render('email.ejs', {
        'email': req.body.email,
    })
});

module.exports = router;