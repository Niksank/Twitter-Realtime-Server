var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var ss = require('socket.io-stream');
var path = require('path');

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit('tweet', { 
    'createAt': 'Septembre',
    'id': '3',
    'text': 'Oui oui non',
    'user': {
      'name': 'Name',
      'avatar': 'img'
    },
    'replyCount': '4',
    'retweetCount': '4',
    'favoriteCount': '5',
    'coordonates': 'ok' 
  });
});

////
var Twitter = require('twitter');
var app = require('http').createServer();
var io = require('socket.io')(app);

var client = new Twitter({
  consumer_key: 'GMnSLn15NE6jF0Sdral7NMvZ6',
  consumer_secret: '3gBY1GllvmgLNbT1LBvKuFxzDFj9HiSio10cNhu6jIakY5ciEV',
  access_token_key: '1086182264919199744-ulsmdq4RVeg97c4VQHPrSSc3qd4dGW',
  access_token_secret: 'XbWbKOEuQLIwD88DqcMQYHqfbc0YpPrL0rGsrUHclHpEQ'
});

app.listen(80);

client.stream('statuses/filter', {track: 'facile'},  function(stream) {
  stream.on('data', function(tweet) {
    io.on('connection', function (socket) {
     socket.emit('tweet',tweet);
    });

    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
