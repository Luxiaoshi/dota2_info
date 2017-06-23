var path = require('path');
var https = require('https');
var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var playerRouter = require('./routes/players');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use('/', indexRouter)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', playerRouter)
app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
