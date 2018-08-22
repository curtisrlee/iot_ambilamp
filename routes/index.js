var express     = require('express'),
    db          = require('../models'),
    router      = express.Router();

router.get('/', function(req, res) {
  
  var setting;
    
  db.Settings.findOne({})
  .then( function(result){
      console.log('settings found');
      setting = result;
      return db.Stats.findOne({});
  })
  .then( function(statResult) {
      console.log('stats found');
      
      var timeInHot = statResult.timeInHot/statResult.timeTotal;
      var timeInCold = statResult.timeInCold/statResult.timeTotal;
      var timeInHumid = statResult.timeInHumid/statResult.timeTotal;
      var timeInDry = statResult.timeInDry/statResult.timeTotal;
      var timeOn = statResult.timeOn/statResult.timeTotal;
      
      var stats = {
          avgTemperature: statResult.avgTemperature.toFixed(2),
          avgHumidity: statResult.avgHumidity.toFixed(2),
          avgBrightness: statResult.avgBrightness,
          temperatureData: [timeInHot, 1-timeInHot-timeInCold, timeInCold],
          humidityData: [timeInHumid, 1-timeInHumid-timeInDry, timeInDry],
          onData: [timeOn, 1-timeOn]
      }
      
      console.log(setting);
      console.log(stats);
      
      res.render('home', {settings: setting, stats: stats});
  })
  .catch (function(err) {
      res.send(err);
  });
});

router.get('/details', function(req, res) {
  db.Data.find().limit(24).sort({timestamp: -1})
  .then( function(data){
    var times = [];
    var temperatures = [];
    var humidities = [];
    var brightnesses = [];
      
    data.forEach ( function (reading) {
        times.push("'" + reading.timestamp + "'");
        temperatures.push(reading.temperature);
        humidities.push(reading.humidity);
        brightnesses.push(reading.brightness);
    })
    res.render('details', { 
        data: data,
        temperature: temperatures.reverse(),
        humidity: humidities.reverse(),
        brightness: brightnesses.reverse(),
        times: times 
    });
  })
  .catch( function(err){
    res.send(err);
  });
    
});

router.post('/set-color', function(req, res) {
  
  db.Settings.findOne({})
  .then( function(result){
    var settings = {
      'lightColor' : req.body.color,
      'lightIsOn' : true
    }
    if(req.body.options){
      if(req.body.options.setAsDefault){
        settings['defaultColor'] = req.body.color;
      }
      else if(req.body.options.changeToDefault){
        settings['lightColor'] = result['defaultColor'];
      }
      else if(req.body.options.turnOff || req.body.color == '000000'){
        settings['lightColor'] = '000000';
        settings['lightIsOn'] = false;
      }
    }
    return db.Settings.findOneAndUpdate({}, settings, {'new': true, upsert: true})
  })
  .then( function(edited){
    console.log(edited);
    res.redirect('/');
  })
  .catch( function(err){
    res.send(err);
  });
  
  
});

router.post('/configure', function(req, res) {
  
  db.Settings.findOneAndUpdate({}, req.body.setting, {'new': true, upsert: true})
  .then( function(edited){
    console.log(edited);
    res.redirect('/');
  })
  .catch( function(errs){
    res.send(err);
  });
  
  
});

/*
router.get('/seed/:temp/:hum/:bright/', (req, res) => {
    var seed = {
        temperature: req.params.temp,
        humidity: req.params.hum,
        brightness: req.params.bright
    }
    db.Data.create(seed)
    .then(function(newData) {
        res.redirect('/details');
    })
    .catch( function(err){
        res.send(err);
    });
});
router.get('/seedStats', (req, res) => {
    var seed = {
        avgTemperature: 32,
        avgHumidity: 11,
        avgBrightness: 721,
        timeInHot: 20,
        timeInCold: 60,
        timeInDry: 80,
        timeInHumid: 8,
        timeOn: 59,
        timeTotal: 100 
    }
    db.Stats.findOneAndUpdate({}, seed, {'new': true, upsert: true})
    .then(function(stats) {
        console.log(stats)
        res.redirect('/');
    })
    .catch( function(errs){
    res.send(err);
    });
});
*/

module.exports = router;
