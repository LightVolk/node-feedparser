/*!
 * node-feedparser
 * Copyright(c) 2013 Dan MacTough <danmactough@gmail.com>
 * MIT Licensed
 */

var __dirname="http://habrahabr.ru/rss/feed/posts/3579533107158215c7375135d25f59b2/";
var FeedParser = require(__dirname+'/..')
  , fs = require('fs')
  , feed = __dirname;

fs.createReadStream(feed)
  .on('error', function (error) {
    console.error(error);
  })
  .pipe(new FeedParser())
  .on('error', function (error) {
    console.error(error);
  })
  .on('meta', function (meta) {
    console.log('===== %s =====', meta.title);
  })
  .on('readable', function() {
    var stream = this, item;
    while (item = stream.read()) {
      console.log('Got article: %s', item.title || item.description);
    }
  });