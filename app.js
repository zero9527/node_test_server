var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
/* 
	websocket
*/
var websocketServer = require('ws').Server,
	websocket = new websocketServer({port: 8181});
var time = new Date().toLocaleString();

websocket.on('connection',function(ws){

	console.log('client connected');
	// ws.send('前台你好！(^=^) '+time);

	ws.on('message',function(message){
		time = new Date().toLocaleString();
		console.log(message);
		// ws.send('前台你好！(^=^) '+ time + '欢迎来信！');
	});

	ws.on('close',function(){
		console.log("服务已关闭！")
	})

	ws.on('error',function(err){
		console.log(err)
	})

	setInterval(function(){
		time = new Date().toLocaleString();
		ws.send('前台你好！ '+time);
	},5000)
});

/*****************************************/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.sendFile(path.resolve('./') + '/views/client.html');
})
app.get('/amaze', function(req, res){
	res.sendFile(path.resolve('./') + '/views/amaze.html');
})
app.get('/widget', function(req, res){
	res.sendFile(path.resolve('./') + '/views/Widget.html');
})
app.get('/0326', function(req, res){
	res.sendFile(path.resolve('./') + '/views/0326.html');
})
app.get('/mine', function(req, res){
	res.sendFile(path.resolve('./') + '/views/mine.html');
})
// app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(8080, function(){
	console.log('服务器已开启：localhost:8080')
})

module.exports = app;
