const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
var User = require('./models/user');
var Post = require('./models/post');
require('dotenv').config();

/* MONGO DB SETUP */
const mongoDB = 'mongodb+srv://'+ process.env.DB_HOST + ':' + process.env.DB_PASS + '@cluster0-4qzuu.azure.mongodb.net/' + process.env.DB_DB + '?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'mongo connection error'));

const app = express();

/* VIEW ENGINE SETUP */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* ROUTES */
const mainpageRouter = require('./routes/mainpage');
const searchRouter = require('./routes/search');

/* PASSPORT CONFIG */
passport.use(
  new LocalStrategy((username,password,done) => {
    User.findOne({username: username}, (err,user) => {
      if (err) return done(err);
      if (!user) {
        return done(null,false,{msg: 'Incorrect username'});
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, {msg: "Incorrect password"})
        }
      })
      return done(null,user);
    });
  })
);

passport.serializeUser(function(user,done) {
  done(null, user.id);
});

passport.deserializeUser(function(id,done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: process.env.DB_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false}));

app.use(function(req,res,next) {
  res.locals.currentUser = req.user;
  next();
})

app.post('/login-user',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

app.use('/', mainpageRouter);
app.use('/search', searchRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function() {
  console.log('Server started at port 3000');
});
