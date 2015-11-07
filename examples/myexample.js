/* global moptions */
var FeedParser = require('feedparser')
  , request = require('request');
var moptions ={feedurl:'http://habrahabr.ru/rss/feed/posts/3579533107158215c7375135d25f59b2/'};

var req = request('http://habrahabr.ru/rss/feed/posts/3579533107158215c7375135d25f59b2/')
  , feedparser = new FeedParser([moptions]);

req.on('error', function (error) {
  // handle any request errors
});
req.on('response', function (res) {
  var stream = this;

  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

  stream.pipe(feedparser);
});


feedparser.on('error', function(error) {
  // always handle errors
});
feedparser.on('readable', function() {
  // This is where the action is!
  var stream = this
    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
    , item;

  while (item = stream.read()) {
    console.log(item);
  }
});