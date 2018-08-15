const mysql = require('mysql');
const express = require('express');
const validator = require('express-validator');
const bodyParser = require('body-parser');
const session = require('express-session');
const socket = require('socket.io');
const cookieParser = require('cookie-parser');
const crypto = require("crypto");
const memory = require("memory");
const flash = require("connect-flash");
const queryDB = require('./database/query');
const passport = require("passport");
const LocalStrategy = require("passport-local");

const app = express();

app.use(express.static(__dirname + '/Library'))

app.set('view engine', 'ejs');
app.set('views', (__dirname + '/Library'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(validator());
app.use(session({
    secret: "asfsdafgwrajgklaio",
    saveUninitialized: false,
    resave: false
}))


const server = app.listen(3000, (err) => {
    if (err) return new Error('Something went wrong!')
    console.log('App is running... listening on port 3000')
})

const io = socket(server);



// const io = socket(server);

// var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
// app.use(sess({
//    name: 'JSESSION',
//    secret: 'MYSECRETISVERYSECRET',
//    store:  store,
//    resave: true,
//    saveUninitialized: true
// }));

// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use('local', new LocalStrategy({

//     usernameField: 'username',

//     passwordField: 'password',

//     passReqToCallback: true //passback entire req to call back
// }, function(req, username, password, done) {
//     if (!username || !password) {
//         return done(null, false, req.flash('message', 'All fields are required.'));
//     }
//     var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
//     connection.query("select * from tbl_users where username = ?", [username], function(err, rows) {
//         console.log(err);
//         console.log(rows);
//         if (err) return done(req.flash('message', err));
//         if (!rows.length) {
//             return done(null, false, req.flash('message', 'Invalid username or password.'));
//         }
//         salt = salt + '' + password;
//.body         var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
//         var dbPassword = rows[0].password;
//         if (!(dbPassword == encPassword)) {
//             return done(null, false, req.flash('message', 'Invalid username or password.'));
//         }
//         return done(null, rows[0]);
//     });
// }));

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//     connection.query("select * from tbl_users where id = " + id, function(err, rows) {
//         done(err, rows[0]);
//     });
// });

app.get('/homepage', function(req, res) {
    res.render('HTML/index', {});
});

app.get('/signup', function(req, res) {
    console.log('Cookies: ', req.cookies);
    res.render('HTML/Signup', {
        title: 'Form Validation',
        success: false,
        errors: req.session.errors,
        errorArr: req.session.errorArr
    })
    req.session.errors = null;
})

app.post("/submit", (req, res) => {
    console.log('Cookies: ', req.cookies);
    let errorArr = [];
    req.check('email', 'Invalid Email Address').isEmail();
    req.check('password', 'Password is invalid').isLength({
        min: 6
    }).equals(req.body.cpassword)

    queryDB.verifyEmail(req.body.email).then((data) => {
        var errors = req.validationErrors();
        console.log(data)
        if (errors || data == true) {
            if (data == false) {
                console.log('no');
                req.session.errors = [];
                req.session.errors = errors;
                for (let error of errors) {
                    errorArr.push(error['msg']);
                }
                console.log(errorArr + " " + req.sessionID);
                console.log(req.body.password + " " + req.body.cpassword + ".")
                req.session.errorArr = errorArr;
            }
            res.redirect('/');

        } else {
            console.log('yes')
            queryDB.storeData('name password email join_date user_id', `'${req.body.name}'  '${req.body.password}' '${req.body.email}' NOW() NULL`, 'users').then(() => {
                // console.log("done");
            }).then(() => {
                req.session.errors = [];
                res.redirect('/homepage');
            })
        }

    })

})

app.post("/homepage/checkdata", (req, res) => {
    console.log('Cookies: ', req.cookies);
    queryDB.getId(`'${req.body.password}'`, `'${req.body.email}'`).then((user_id) => {
        queryDB.verifyUser(req.body.password, req.body.email).then((data) => {
            console.log("I am " + data);
            if (data != null) {
                res.cookie('user_id', user_id, {
                    maxAge: 30 * 30 * 1000
                });
                res.redirect('/feed')
            } else {
                res.redirect('/homepage')
            }
        })
    })
})

app.post("/checkdata", (req, res) => {
    console.log('Cookies: ', req.cookies);
    queryDB.getId(`'${req.body.password}'`, `'${req.body.email}'`).then((user_id) => {
        queryDB.verifyUser(req.body.password, req.body.email).then((data) => {
            if (data == true) {
                res.cookie('user_id', user_id, {
                    maxAge: 30 * 30 * 1000
                });
                res.redirect('/feed')
            } else {
                res.redirect('/homepage')
            }
        })
    })
})

app.get("/question", (req, res) => {
    console.log('Cookies: ', req.cookies);
    if (req.cookies.user_id != undefined) {
        console.log(req.cookies.user_id);
        req.session.cookie.maxAge += (1000 * 50);
        queryDB.getData('name', req.cookies.user_id).then((data) => {
            // res.render("HTML/question", {
            //     questionNum: req.query.questionNum,
            //     name : data 
            // })
            res.redirect(`/questionc?questionNum=3&userId=${data}`)
        })   
    } else {
        res.redirect('/homepage')
    }
})

app.get("/questionc", (req, res) => {
    if (req.cookies.user_id != undefined) {
        console.log(req.cookies.user_id);
        req.session.cookie.maxAge += (1000 * 50);
        queryDB.getData('name', req.cookies.user_id).then((data) => {
            res.render("HTML/question", {
                questionNum: req.query.questionNum,
                name : data 
            })
        })   
    } else {
        res.redirect('/homepage')
    }
})

app.get("/feed", (req, res) => {
    console.log('Cookies: ', req.cookies);
    if (req.cookies.user_id != undefined) {
        console.log(req.cookies.user_id);
        req.session.cookie.maxAge += (1000 * 50);
        queryDB.getData("name", req.cookies.user_id).then((data) => {
            res.render("HTML/Feed", {
                userName : data
            });
        })  
    } else {
        res.redirect('/homepage')
    }
})


app.get('/feedChat', (req, res) => {
    console.log('Cookies: ', req.cookies);
    if (req.cookies.user_id != undefined) {
        console.log(req.cookies.user_id);
        req.session.cookie.maxAge += (1000 * 50);
        queryDB.getData("name", req.cookies.user_id).then((data) => {
            res.render('HTML/feedChat', {
                userName : data
            });
        })
    } else {
        res.redirect('/homepage')
    }
})


app.get('/userProfile', (req, res) => {
    console.log('Cookies: ', req.cookies);
    if (req.cookies.user_id != undefined) {
        console.log(req.cookies.user_id);
        req.session.cookie.maxAge += (1000 * 50);
        queryDB.getData("name", req.cookies.user_id).then((data) => {
            res.render('HTML/UX', {
                userName : data
            });
        })
    } else {
        res.redirect('/homepage')
    }
})

app.get('/', (req, res) => {
    res.redirect('/signup')
})


app.get('/logout', (req, res) => {
    res.clearCookie('user_id');
    res.redirect('/homepage')
})


io.on('connection', (socket) => {
    console.log('User Socket Connection Created...' + socket.id)

    socket.on('chat' , (data) => { //Waits for 'chat' message to be sent
        io.sockets.emit(data.chat_id, data);
    })

    socket.on('SOS', (data) => {
        io.sockets.emit(data.chat_id, data);
    })
})