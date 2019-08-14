
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var tools = require('./routes/tools');
var about = require('./routes/about');
var login = require('./routes/login');

// feature routes
var tuner = require('./routes/tuner');
var notebook = require('./routes/notebook');
var learn = require('./routes/learn');
var metronome = require('./routes/metronome');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/tools', tools.view)
app.get('/about', about.view)
app.get('/login', login.view)
app.get('/tuner', tuner.view)
app.get('/notebook', notebook.view)
app.get('/learn', learn.view)
app.get('/metronome', metronome.view)

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
