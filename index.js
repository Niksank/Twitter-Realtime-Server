//require
var Twitter = require('twitter');
var app = require('http').createServer();
var io = require('socket.io')(app);
const twitterKey = require('../twitter-key.js');

/**
 * @constructor
 * @param {object} tweet
 * @return transform
 */
var transform = function transform (tweet){
  return {
    'created_at': tweet.created_at,
    'id': tweet.id_str,
    'text': tweet.text,
    'user': {
      'name': tweet.user.name,
      'profile_image_url': tweet.user.profile_image_url
    },
    'reply_count': tweet.reply_count,
    'retweet_count': tweet.retweet_count,
    'favorite_count': tweet.favorite_count,
    'coordonates': tweet.coordonates
  }
}

app.listen(80);

let getTwitterKey = twitterKey.getKey(); // val is "Hello"  
var client = new Twitter(getTwitterKey);

/**
 * @param socket
*/
io.on('connection', function (socket) {
  var stream = client.stream('statuses/filter', {track: 'facile'});
  stream.on('data', function(tweet) {
    console.log(tweet.text);
    socket.emit('tweet',transform(tweet));
  });
});
