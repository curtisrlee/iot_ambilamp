var db = require('../../models');

exports.getData = function(req, res) {
	db.Data.find()
	.then( function(data) {
		res.json(data);
	})
	.catch( function(err) {
		res.send(err);
	})
}

exports.createData = function(req, res) {
	db.Data.create(req.body)
	.then (function(newData) {
		res.json(newData);
	})
	.catch ( function(err) {
		res.send(err);
	});
}

exports.deleteData = function(req, res) {
	db.Data.remove({})
	.then ( function() {
		res.json({message: 'Data wiped'});
	})
	.catch ( function(err) {
		res.send(err);
	});
}