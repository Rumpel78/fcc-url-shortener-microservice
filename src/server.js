var express = require('express')
var shortid = require('shortid')
var mongoUrl = "mongodb";
var db = require('monk')(mongoUrl)
var links = db.get('links');

var app = express()

app.use(express.static('public'));

app.set('view engine', 'pug');

app.get('/', function (req, res) {
  var baseUrl = req.protocol + '://' + req.hostname + ':' + port;

  var mainDomain = req.hostname.substr(req.hostname.indexOf('.') + 1);
  var baseHome = req.protocol + '://' + mainDomain + ':' + port

  res.render('index', { host: baseUrl, home: baseHome });
});

app.get('/new/*', function (req, res) {
  var url = req.params[0]
  var key = shortid.generate()
  var baseUrl = req.protocol + '://' + req.hostname + ':' + port;

  links.insert({ key: key, url: url })
  res.send(JSON.stringify({ "original_url": url, "short_url": baseUrl + '/' + key }))
})

app.get('/:shortUrl', function (req, res) {
  var shorturl = req.params.shortUrl
  var url = links.findOne({ key: shorturl }).then((doc) => {
    res.setHeader('Content-Type', 'application/json')
    res.redirect(doc.url);
  }).catch((err) => {
    res.redirect("/")
  })
})

var port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('App listening on port ' + port)
})
