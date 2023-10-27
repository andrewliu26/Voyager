let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const bodyParser = require('body-parser');

let cors = require('cors');
let indexRouter = require('../voyager-be/routes');
let usersRouter = require('../voyager-be/routes/users');
const chatGPTRouter = require('../voyager-be/routes/chatGPTAPI');
const facebookRouter = require('../voyager-be/routes/facebookOauth');
let googleRouter = require('../voyager-be/routes/googleAuth');

const PORT = 3000;

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/google', googleRouter);
app.use('/users', usersRouter);
app.use('/', facebookRouter);
app.use('/api', chatGPTRouter); //http://localhost:3000/chatgpt

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


/*
app.listen(PORT, 0.0.0.0,() => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
*/
app.listen('voyager-server.loca.lt', () => {
  console.log('Server is running on https://voyager-server.loca.lt/');
})

module.exports = app;
