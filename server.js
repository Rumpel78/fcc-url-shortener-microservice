var express = require('express')
var shortid = require('shortid')
var db = require('monk')('localhost/urlshortener')
var links = db.get('links');

var app = express()
var baseUrl = "https://rumpels-fcc-url-shortener-ms.herokuapp.com/"

app.use(express.static('public'));

app.get('/new/*', function (req, res) {
    var url = req.params[0]
    var key = shortid.generate()
    links.insert({ key: key, url: url })
    res.send(JSON.stringify({ "original_url": url, "short_url": baseUrl+key}))
})

app.get('/:shortUrl', function (req, res) {
  var shorturl = req.params.shortUrl
  var url = links.findOne({ key: shorturl}).then((doc)=>{
    res.redirect(doc.url);
  }).catch((err) => {
    res.redirect("/")
  })
})

var port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('App listening on port '+port)
})
