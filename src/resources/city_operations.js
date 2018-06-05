var City = require('../../models/city.js');
var logger = require('winston');

var getCities = function (req, res) {
	logger.info("GET - /city");
	return City.find(function (err, cities) {
		if (!err) {
			return res.send(cities);
		} else {
			res.statusCode = 500;
			logger.error('Internal error(%d): %s', res.statusCode, err.message);
			return res.send({
				error : 'Server error'
			});
		}
	});
}

var createCity = function (req, res) {
	var city = new City({
			cityName : req.body.cityName
		});

        city.save(function (err) {
		if (!err) {
			logger.info("User created");
			res.json({
				stausCode : 200,
				City : city
			});
		} else {
			logger.error(err);
			if (err.name == 'ValidationError') {
				res.json({
					statusCode : 400,
					error : 'Validation error'
				});
			} else {
				res.json({
					statusCode : 500,
					error : 'API Server error'
				});
			}
			logger.error('Internal error(%d): %s', res.statusCode, err.message);
		}
	});
}

var updateCity = function (req, res) {
	return City.findById(req.params.cityId, function (err, city) {
		if (!city) {
			return res.json({
				statusCode : 404,
				error : 'Not found'
			});
		}

		if (req.body.cityNmae != null)
			city.cityName = req.body.cityName;
		

		return city.save(function (err) {
			if (!err) {
				logger.info('User info has been updated');
				return res.json({
					statusCode : 200,
					city : city
				});
			} else {
				if (err.name == 'ValidationError') {
					res.json({
						statusCode : 400,
						error : 'Validation error'
					});
				} else {
					res.json({
						statusCode : 500,
						error : 'Server error'
					});
				}
				logger.error('Internal error(%d): %s', res.statusCode, err.message);
			}
		});
	});
}

var removeCity = function (req, res) {
	return City.findById(req.params.cityId, function (err, city) {
		if (!city) {
			return res.send({
				statusCode : 404,
				error : 'Not found'
			});
		}

		return city.remove(function (err) {
			if (!err) {
				logger.info('Removed city successfully');
				return res.json({
					status : 200
				});
			} else {
				logger.error('Internal error(%d): %s', res.statusCode, err.message);
				return res.json({
					statusCode : 500,
					error : 'Server error'
				});
			}
		})
	});
}

exports.getCities = getCities
exports.createCity = createCity
exports.updateCity = updateCity
exports.removeCity = removeCity