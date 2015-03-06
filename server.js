var express = require('express'),
    json = require('express-json'),
    methodOverride = require('express-method-override'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    logger = require('dev-logger'),
    http = require('http'),
    path = require('path'),
    routes = require('./app/routes'),
    exphbs = require('express3-handlebars'),
    mongoose = require('mongoose'),
    seeder = require('./app/seeder'),
    app = express();

app.set('port', process.env.PORT || 3300);
//app.use(logger);
app.use(json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser('some-secret-value-here'));
app.use('/',express.static(path.join(__dirname, 'public')));

//development only
if('development' == app.get('env')) {
  app.use(errorHandler());
}

app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: app.get('views') + '/layouts'
}));

app.set('view engine', 'handlebars');

//Connect to database using mongoose
mongoose.connect('mongodb://praburajan:welcome1@ds049171.mongolab.com:49171/ideabox');
mongoose.connection.on('error', console.error);
mongoose.connection.on('open', function() {
  console.log("Connected to Mongoose...");
  //Check if the db is empty and seed data
  seeder.check();
});



//initialize routes list
routes.initialize(app);

//finally boot up the server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Server running: http://localhost:' + app.get('port'));
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
   console.log('Mongoose disconnected through app termination');
   process.exit(0);
  });
});