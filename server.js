//Require Stuff
var express = require('express');
var path = require('path');

//App Stuff
var app = express();
app.use('/css',express.static(path.join(__dirname + '/css')));
app.use('/components', express.static(path.join(__dirname + '/components')));
app.use('/libs', express.static(path.join(__dirname + '/libs')));
app.use('/main.js', express.static(path.join(__dirname + '/main.js')));

//Configuration
const PORT = 12345;

//Main Page
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

//Add the API Uses later.

app.listen(PORT, function(){
  console.log('Listening on port 12345');
});
