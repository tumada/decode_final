/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/socket.io/socket.io.d.ts" />


/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var hbs = require('hbs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var vote = {options: [1,1,1,1]};

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
  socket.on('send chat', function(data){
    console.log(data);
    socket.emit('recieve chat', data);
    socket.broadcast.emit('recieve chat', data);
  }); 
  
  socket.on('send vote', function(data){
    var jData = JSON.parse(data);
    vote.options[jData.id] += 1;
    socket.broadcast.emit('recieve poll', JSON.stringify(vote));
    socket.emit('recieve poll', JSON.stringify(vote));    
  });
  
});
