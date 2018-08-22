var express			= require('express'),
	router			= express.Router(),
	db				= require('../models'),
	dataHelpers		= require('./helpers/data'),
	statsHelpers	= require('./helpers/stats'),
	settingsHelpers	= require('./helpers/settings');

router.route('/data')
	.get(dataHelpers.getData)
	.post(dataHelpers.createData)
	.delete(dataHelpers.deleteData);


router.route('/data/:id')
	.get(dataHelpers.getOneData)
	.put(dataHelpers.editData)
	.delete(dataHelpers.deleteOneData);

router.route('/settings')
	.get(settingsHelpers.getSettings)
	.put(settingsHelpers.editSettings);

router.route('/statistics')
	.get(statsHelpers.getStats)
	.put(statsHelpers.resetStats)
	.delete(statsHelpers.resetStats);

module.exports = router;