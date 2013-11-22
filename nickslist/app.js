var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nickslist_odm');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/category/:category', routes.category);
app.get('/listing', routes.listing);
app.post('/listing', routes.addListing);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
