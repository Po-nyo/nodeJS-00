let express = require('express');
let router = express.Router();
let path = require('path')

router.get('', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/form.html"));
});

module.exports = router;