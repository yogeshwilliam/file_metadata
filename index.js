var express = require('express');
var cors = require('cors');
require('dotenv').config()
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({extended:false}));

// set up multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'uploadedFiles')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
//create multer instance
var upload = multer({ storage: storage })

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {   
  res.status(200).json({"name":req.file.originalname,"type":req.file.mimetype,"size":req.file.size});
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port- localhost:' + port)
});
