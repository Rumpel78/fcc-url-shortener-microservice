var express = require('express')
var shortid = require('shortid')
var mongoUrl = "mongodb";
var db = require('monk')(mongoUrl)
var links = db.get('links');

var app = express()

app.use(express.static('public'));

app.set('view engine', 'pug');

var mainRouter = express.Router();
var basePath = process.env.BASEPATH || '';
app.use(basePath, mainRouter);

mainRouter.get('/', function (req, res) {
  var baseUrl = req.protocol + '://' + req.hostname;
  res.render('index', { baseUrl, basePath });
});

mainRouter.get('/new/*', function (req, res) {
  var url = req.params[0]
  var key = shortid.generate()
  var baseUrl = req.protocol + '://' + req.hostname;
  
  links.insert({ key: key, url: url })
  res.send(JSON.stringify({ "original_url": url, "short_url": baseUrl + basePath + '/' + key }))
})

mainRouter.get('/:shortUrl', function (req, res) {
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
