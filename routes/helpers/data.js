var express     = require('express'),
    db          = require('../../models'),
    router      = express.Router();

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
	var setting;
	var stat;
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

exports.getOneData = function(req, res) {
	db.Data.findById(req.param.id)
	.then( function(foundData) {
		res.json(foundData);
	})
	.catch( function(err) {
		res.send(err);
	});
}

exports.editData = function(req, res) {
	db.Data.findOneAndUpdate( {_id: req.params.id}, req.body, {'new': true, upsert: true} )
	.then( function(editedData) {
		res.json(editedData);
	})
	.catch( function(err) {
		res.send(err);
	});
}

exports.deleteOneData = function(req, res) {
	db.Data.remove( {_id: req.params.id}, req.body, {'new': true, upsert: true} )
	.then ( function() {
		res.json({message: 'Sucessfully deleted'});
	})
	.catch ( function(err) {
		res.send(err);
	});
}
