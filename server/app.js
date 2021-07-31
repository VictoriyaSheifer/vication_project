const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//picture upload
var multer = require('multer');
var path = require('path');
//socket
const http = require("http")
const socketIO = require("socket.io")
const server =http.createServer(app)
const io = socketIO(server,{
  cors:{
    origin: "*"
  }
});

/* ************************ */
/*       Define Models      */
/* ************************ */

const Vacations = require('./models/VacationsModel');
const Users = require('./models/UsersModel');
const UserVacation = require('./models/userVacationModale');

Users.belongsToMany(Vacations, { through: 'user_vacations' });


/* ************************ */
/*       Define sequelize   */
/* ************************ */

const Sequelize = require('sequelize');
const sequelize = require('./utils/databse');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}

/* ************************ */
/*       Define cors        */
/* ************************ */

app.use(cors(corsOptions))

/* ************************ */
/*       Routes             */
/* ************************ */

const VacationsRoute = require('./routes/VacationsRoute');
app.use("/vacations", VacationsRoute);

const UsersRoute = require('./routes/UsersRoute');
app.use("/users", UsersRoute);

/* ************************ */
/*       Upload image       */
/* ************************ */

// specify the folder
app.use(express.static(path.join(__dirname, 'uploads')));
// headers and content type
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
  console.log('files::::::::::::::::::', req.files);
  res.send(req.files);
});

/* ************************ */
/*       app               */
/* ************************ */

app.use((req, res) => {
    res.send("Page NotFound");
})

sequelize.sync().then(result => {
    console.log("Connected DB !!")
    app.listen(5000);
   
}).catch(err => {
    console.log("Error connected DB !!")
})

/* ************************ */
/*       Socket io          */
/* ************************ */

//module.exports =  io;
// This is what the socket.io syntax is like, we will work this later
io.on('connection', (socket) => {
    console.log('New client connected::::::::::::::')

    //update-vacation session
    socket.on('update-vacation2', () => {
        console.log('vacaion Changed to::::::::::::: ')
        io.sockets.emit('update-vacation')
    })
    //delete session
    socket.on('delete', () => {
      console.log('delete Changed to::::::::::::: ')
      io.sockets.emit('delete-vacation')
  })
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    
    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(5003, () => console.log(`Listening on port ${5003}`))