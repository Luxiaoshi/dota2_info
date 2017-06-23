var express = require('express');
var https = require('https')
var router = express.Router();
var app = express()
var json = require('../hero.json')

router.get('/players/:player_id', function(request, response){
  // var player_id = request.params.player_id
  // console.log(player_id)

  response.render("players")

})

module.exports = router;
