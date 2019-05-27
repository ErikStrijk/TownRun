//IMPORT DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

//DECLEARE MODULES
const app = express();
const apis = require('./Apis');
const dialogflow = require('./Dialogflow/Intents');

//Configuration
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//MULTER SETUP
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now());

  }
});
const upload = multer({ storage: storage });

//APIS
app.post('/dialogflow', dialogflow); 

app.post('/getCurrentData', apis.getCurrentData); 
app.post('/validateLogin', apis.validateLogin);
app.post('/challengeWithPhoto', upload.single('photo'), apis.challengeWithPhoto); 
app.post('/challenge', apis.challenge); 
app.post('/dialogflow', apis.challenge); 
app.post('/arrivedAtLocation', apis.arrivedAtLocation); 

app.listen(port, () => {
  console.log("Rest API is running at port: " + port);
});