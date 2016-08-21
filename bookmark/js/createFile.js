var fs = require("fs");
var createStream = fs.createWriteStream("bookmarks.json");
createStream.end();