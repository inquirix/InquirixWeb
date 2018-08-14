const mysql = require('mysql');
const express = require('express');
const validator = require('express-validator');
const bodyParser = require('body-parser');
const session = require('express-session');
// const socket = require('socket.io');
// const cookieParser = require('cookie-parser');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))
app.use(validator());
// app.use(cookieParser());
app.use(session({secret:"max", saveUninitialized:false,resave:false}))


const server = app.listen(3000, (err) => {
    if(err) return new Error('Something went wrong!')
    console.log('App is running... listening on port 3000')
    queryDB.changeData('name password', "'Jeremy' '98835'", "name = 'John' ",'users')

})


// const io = socket(server);

// var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
// app.use(sess({
//    name: 'JSESSION',
//    secret: 'MYSECRETISVERYSECRET',
//    store:  store,
//    resave: true,
//    saveUninitialized: true
// }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy({

    usernameField: 'username',
  
    passwordField: 'password',
  
    passReqToCallback: true //passback entire req to call back
  } , function (req, username, password, done){
        if(!username || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
        var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
        connection.query("select * from tbl_users where username = ?", [username], function(err, rows){
            console.log(err); console.log(rows);
          if (err) return done(req.flash('message',err));
          if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }
          salt = salt+''+password;
          var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
          var dbPassword  = rows[0].password;
          if(!(dbPassword == encPassword)){
              return done(null, false, req.flash('message','Invalid username or password.'));
           }
          return done(null, rows[0]);
        });
      }
  ));

  passport.serializeUser(function(user, done){
    done(null, user.id);
    });

passport.deserializeUser(function(id, done){
    connection.query("select * from tbl_users where id = "+ id, function (err, rows){
        done(err, rows[0]);
    });
});

const connection = mysql.createConnection({
    host     : '10.67.71.7',
    user     : 'root',
    password : '98835Piggy98835!',
    database : 'students'
  });

  app.get('/HTML/index', function(req, res){
    res.render('HTML/index',{'message' :req.flash('message')});
  });


  app.post("/HTML/index", passport.authenticate('local', {
    successRedirect: 'HTML/Feed',
    failureRedirect: '/HTML/index',
    failureFlash: true
}), function(req, res, info){
    res.render('HTML/Feed',{'message' :req.flash('message')});
});

// const io = socket(server);

// io.on('connection', (socket) => {
//     console.log('User Socket Connection Created...' + socket.id)

//     socket.on('chat' , (data) => { //Waits for 'chat' message to be sent
//         console.log('Hello World');
//     })
// })

