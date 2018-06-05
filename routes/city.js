var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var city = require('../src/resources/city_operations')

router.get('/all', function(req, res, next) {
    city.getCities(req, res)
});


router.post('/', function(req, res, next) {
    city.createCity(req, res)
});

router.put('/:cityId', function(req, res, next) {
    city.updateCity(req, res)
});

router.delete('/:cityId', function(req, res, next) {
    city.removeCity(req, res)
});

module.exports = router;