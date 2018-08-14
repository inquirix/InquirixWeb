const mysql = require('mysql');
const express = require('express');
const validator = require('express-validator');
const bodyParser = require('body-parser');
const session = require('express-session')
const socket = require('socket.io');
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.static(__dirname + '/lib'))

app.set('view engine', 'ejs');
app.set('views', (__dirname + '/lib'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))
app.use(validator());
app.use(cookieParser());
app.use(session({secret:"max", saveUninitialized:false,resave:false}))


const server = app.listen(3000, (err) => {
    if(err) return new Error('Something went wrong!')
    console.log('App is running... listening on port 3000')
})


const connection = mysql.createConnection({
    host     : '10.67.71.7',
    user     : 'root',
    password : '98835Piggy98835!',
    database : 'students'
  });

const io = socket(server);

io.on('connection', (socket) => {
    console.log('User Socket Connection Created...' + socket.id)

    socket.on('chat' , (data) => { //Waits for 'chat' message to be sent
        console.log('Hello World');
    })
})