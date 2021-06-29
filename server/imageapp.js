var express = require('express');
var multer = require('multer');
var path = require('path');
var app = express();
var port = 3003;


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
    console.log('files', req.files);
    res.send(req.files);
  });


  var server = app.listen(port, function () {
    console.log("Listening on port %s...", port);
  });


  ////https://www.npmjs.com/package/multer
  ////https://scotch.io/tutorials/express-file-uploads-with-multer