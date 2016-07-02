//Require Stuff
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('graceful-fs');

//App Stuff
var app = express();
app.use('/css',express.static(path.join(__dirname + '/css')));
app.use('/components', express.static(path.join(__dirname + '/components')));
app.use('/libs', express.static(path.join(__dirname + '/libs')));
app.use('/data', express.static(path.join(__dirname + '/data')));
app.use('/main.js', express.static(path.join(__dirname + '/main.js')));

app.use(bodyParser.json());

//Configuration
const PORT = 12345;
var options = {strict: false};
var jsonParser = bodyParser.json(options);

//Main Page
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

//Graph data
app.get('/graphs', function(req,res){
  res.sendFile(path.join(__dirname+'/data/graphs.json'));
});

app.post('/graphs', function(req,res){
  var errored = false;
  console.log('TODO: Graph updating function.');
  console.log('It should save to /data/graphs.json');
  var jsonString = JSON.stringify(req.body);
  console.log(jsonString);
  if(req.body === undefined){
    res.sendStatus(400);
  }
  else{
    fs.writeFile(__dirname + '/data/graphs.json',jsonString,function(err){
      errored = true;
    });
    if(errored){
      res.sendStatus(500);
    }else{
      res.sendStatus(200);
    }
  }
});

//Add the API Uses later.

app.listen(PORT, function(){
  console.log('Listening on port 12345');
});
