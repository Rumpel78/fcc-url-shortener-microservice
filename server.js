var express = require('express')
var db = require('monk')('localhost/urlshortener')
var links = db.get('links');

var createKey = function(){
  var key = Math.floor(Math.random()*8999+1000)
  links.findOne({ "key": key }).then(doc => { 
    if(doc === null){
      console.log(key)
      return key
    }
    return createKey()
  })
}

console.log(createKey())

var app = express()

app.use(express.static('public'));

app.get('/new/*', function (req, res) {
    var url = req.params[0]
    var key = createKey()
    res.end()
})

var port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('App listening on port '+port)
})
