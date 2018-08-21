var	express 	  = require('express'),
    bodyParser  = require('body-parser'),
	  app		      = express();

var indexRoutes = require('./routes/index');

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/', indexRoutes);

// Start up server
app.listen(app.get('port'), function() {
	console.log("Listening on port ", app.get('port'));
});
