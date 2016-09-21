// --- Requirements ---

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var partials = require('./routes/partials');
var test = require('./routes/test');
var api = require('./routes/api');

// Custom js files
var cmdHandler = require('./working/cmd-handler');
var socketEvents = require('./working/socket');

// App
var app = express();

// Socket.IO
var server = require('http').Server(app);
var SocketIO = require('socket.io')(server);





// --- Set-up ---

// View engine set-up.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Auto-generated intial set-up:
app.use(favicon(path.join(__dirname, 'public/images/favicon/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  debug: true,
  outputStyle: 'compressed',
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Custom locals.
app.locals.displayOutput = require('./working/display-output');
app.locals.vars =
{
  // Global.
  title:            'ContentMine',
  // Paths.
  jsPath:           '/javascripts/',
  librariesPath:    '/javascripts/libraries/',
  customJsPath:     '/javascripts/custom/',
  stylesheetsPath:  '/stylesheets/',
  imagesPath:       '/images/',
  faviconPath:      '/images/favicon/',
  iconsPath:        '/images/icons/',
  // Content.
  outputValue:      'Command output...'
};

// Custom middleware.
//

// Routes registration.
app.use('/', routes);
app.use('/partials', partials);
app.use('/test', test);

// JSON API.
app.use('/', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Socket.IO.
SocketIO.on('connection', socketEvents);

/*
app.use(function(req, res, next){
  res.SocketIO = SocketIO;
  next();
});
*/





// --- Error handlers ---

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});





// --- Exports ---

module.exports = {app: app, server: server};