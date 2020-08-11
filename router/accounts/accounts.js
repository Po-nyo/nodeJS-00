let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

// DATABASE SETTINGS
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'test',
    database: 'test_db'
});

connection.connect();

router.get('/join', function(req, res) {
    var massage;
    let errMessage = req.flash('error')
    if(errMessage)
        message = errMessage
    res.render('join.ejs', {
        'message': message
    });
});

passport.serializeUser(function(user, done) {
    console.log('passport session saved : ', user.id);
    done(null, user.id);
})

passport.deserializeUser(function(id, done) {
    console.log('passport session get id : ', id);
    done(null, id);
})

passport.use('local-join',
    new LocalStrategy({
        usernameField: 'name',
        passwordField: 'pw',
        passReqToCallback: true,
    }, function(req, name, pw, done) {
        let query = connection.query('select * from user where name=?',
            [name],
            function(err, rows) {
                if(err) return done(err);
                if(rows.length) {
                    console.log('user exist');
                    return done(null, false, {message: 'username is taken already'})
                }
                else {
                    let sql = {name: name, pw: pw};
                    connection.query('INSERT INTO user set ?', sql, function(err, rows) {
                        if(err) throw err
                        return done(null, {'name': name, 'id': rows.insertId});
                    })
                }
            })
        console.log('local-join callback called');
    })
);

passport.use('local-login',
    new LocalStrategy({
        usernameField: 'name',
        passwordField: 'pw',
        passReqToCallback: true,
    }, function(req, name, pw, done) {
        connection.query('select * from user where name=?',
            [name],
            function(err, rows) {
                if(err) return done(err);
                if(rows.length) {
                    if (rows[0].pw === pw)
                        return done(null, {'name': name, 'id': rows[0]._id})
                    else
                        return done(null, false, {'message': 'wrong password'})
                }
                else
                    return done(null, false, {'message': 'login info not found'});
            })
        console.log('local-login callback called');
    })
);

router.get('/sign_in', function(req, res) {
    res.render('sign_in.ejs')
})

router.post('/sign_in', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if(err)
            res.status(500).json(err);
        if(!user)
            return res.status(401).json(info.message);

        req.logIn(user, function(err) {
            if(err)
                return next(err);
            return res.json(user);
        });
    })(req, res, next);
});

router.post('/join',
    passport.authenticate('local-join', {
        successRedirect: '/',
        failureRedirect: '/accounts/join',
        failureFlash: true
    })
);

// router.post('/join', function(req, res) {
//     const body = req.body;
//     const name = body.name;
//     const pw = body.pw;
//     const email = body.email;
//
//     let sql = {name: name, pw: pw, email: email}
//     connection.query('INSERT INTO user set ?', sql,
//         function(err, rows) {
//             if(err)
//                 throw err;
//             else {
//                 console.log("insert ok", rows);
//                 res.render('welcome.ejs', {
//                     'id': rows.insertId,
//                     'name': name,
//                 })
//             }
//         })
// })

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router;