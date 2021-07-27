const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//picture upload
var multer = require('multer');
var path = require('path');
//socket
const http = require('http')
const socketIO = require('socket.io')

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
/*       Socket io          */
/* ************************ */



/* ************************ */
/*       General            */
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


  




