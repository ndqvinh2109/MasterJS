// server.js

// BASE SETUP
// =============================================================================

function Bookmark(id, title, link) {
    this.id = id || 0;
    this.title = title || "";
    this.link = link || "";
}

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// a middleware with no mount path, gets executed for every request to the router

router.use(function(req, res, next) {
    console.log('Time:', Date.now());
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'hello world'
    });
});

// more routes for our API will happen here
var fs = require('fs');

router.route('/bookmarks')

.post(function(req, res) {
    fs.readFile('bookmarks.json', 'utf8', function(err, data) {
        if (err) throw err;
        var bookmarks = [];

        if (data) {
            bookmarks = JSON.parse(data);
        }

        var d = new Date();
        var id = d.getMilliseconds();

        var bookmark = new Bookmark(id, req.body.title, req.body.link);
        bookmarks.push(bookmark);

        var strBookmarks = JSON.stringify(bookmarks);
        fs.writeFile('bookmarks.json', strBookmarks, 'utf-8', function(err) {
            if (err) throw err;

            res.json({
                returnedObject: bookmark
            });

        })

    });

})

.get(function(req, res) {
    fs.readFile('bookmarks.json', 'utf8', function(err, data) {
        var bookmarks = [];
        if (err) throw err;
        if (data) {
            res.json(
                JSON.parse(data)
            );
        }
    });
});


router.route('/bookmarks/:bookmark_id')

.delete(function(req, res) {
    fs.readFile('bookmarks.json', 'utf8', function(err, data) {
        if (err) throw err;
        var bookmarks = [];

        if (data) {
            bookmarks = JSON.parse(data);
        }
        
        for (var bookmark in bookmarks) {
            if (bookmarks[bookmark].id == req.params.bookmark_id) {
                bookmarks.splice(bookmark, 1);

            }
        }

        var strBookmarks = JSON.stringify(bookmarks);
        fs.writeFile('bookmarks.json', strBookmarks, 'utf-8', function(err) {
            if (err) throw err;

            res.json({
                message: 'Successfully deleted'
            });

        })

    });
})

.put(function(req, res) {
    fs.readFile('bookmarks.json', 'utf8', function(err, data) {
        if (err) throw err;
        var bookmarks = [];

        if (data) {
            bookmarks = JSON.parse(data);
        }
        var returnedBookmark = {};
        for (var bookmark in bookmarks) {
            if (bookmarks[bookmark].id == req.params.bookmark_id) {

                bookmarks[bookmark].title = req.body.title;
                bookmarks[bookmark].link = req.body.link;
                returnedBookmark = bookmarks[bookmark];
            }
        }

        var strBookmarks = JSON.stringify(bookmarks);
        fs.writeFile('bookmarks.json', strBookmarks, 'utf-8', function(err) {
            if (err) throw err;
            res.json(
                returnedBookmark
            );

        })

    });
})

.get(function(req, res) {
    fs.readFile('bookmarks.json', 'utf8', function(err, data) {
        if (err) throw err;
        var bookmarks = [];

        if (data) {
            bookmarks = JSON.parse(data);
        }

        for (var bookmark in bookmarks) {
            if (bookmarks[bookmark].id == req.params.bookmark_id) {
                res.json(
                    bookmarks[bookmark]
                );
            }
        }
    });
})

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
