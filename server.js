var express = require('express'),
    http = require('http'),
    path = require('path'),
//    routes = require('./app/routes'),
    exphbs = require('express3-handlebars'),
    mongoose = require('mongoose'),
    seeder = require('./app/seeder'),
    app = express();

app.set('port', process.env.PORT || 3300);
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(express.cookieParser('some-secret-value-here'));
//app.use(app.router);
app.use('/',express.static(path.join(__dirname, 'public')));

//development only
// if('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

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
//routes.initialize(app);

//finally boot up the server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Server running: http://localhost:' + app.get('port'));
});