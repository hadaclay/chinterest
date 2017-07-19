const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const helmet = require('helmet');
const routes = require('./routes/index');
const errorHandlers = require('./handlers/errorHandlers');
require('./handlers/passport');

// Create Express app
const app = express();

// Enable helmet
app.use(helmet());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve assets from public/ directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

// Set up Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    key: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

app.use('/', routes);

// If route doesn't match, 404 and send to errorHandler
app.use(errorHandlers.notFound);

// If we get here, we got a really bad error, print stack trace in dev mode
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

// Production error handler
app.use(errorHandlers.productionErrors);

module.exports = app;
