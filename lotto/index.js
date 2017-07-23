var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/lunch', function(req, res) {
  res.send('점심 뭐먹지');
});

app.get('/lotto', function(req, res) {
  res.send('인생은 한방 ㅇㅇㅇㅇㅇㅇ');
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!!");
})
