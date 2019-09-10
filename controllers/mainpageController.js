const {body,validationResult} = require('express-validator/check')
const {sanitizeBody} = require('express-validator/filter');
const async = require('async');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const session = require('express-session');
const passport = require('passport');
const Post = require('../models/post');

const validateLogin = [

];

exports.index = function(req,res,next) {

  async.parallel(
    {
      posts: (callback) => {
        Post.find().populate('author').sort({'date_created': -1}).exec(callback);
      },
      usersAmount: (callback) => {
        User.countDocuments().exec(callback);
      },
      postsAmount: (callback) => {
        Post.countDocuments().exec(callback);
      }
    }, (err, results) => {
      if (err) {return next(err);}
      res.render('mainpage', {user: req.user, posts: results.posts, useramount: results.usersAmount, postamount: results.postsAmount});
    }
  )

};

exports.register_user = [

  (req,res,next) => {

    const errors = validationResult(req);

    let colorsArray = ['#b9d2fa','#b9faf1','#b9fad2','#b9fabc','#cafab9','#dffab9','#f1fab9',
  '#faeab9','#fad3b9','#fabab9','#fab9d7','#f6b9fa','#d6b9fa','#bab9fa','#b9dbfa','#b9faf7'];
    let randomColor = colorsArray[(Math.floor(Math.random() * colorsArray.length))];


      bcrypt.hash(req.body.registerpassword, 10, (err, hashedPassword) => {
        const user = new User(
          {
            username: req.body.registerusername,
            password: hashedPassword,
            date_joined: Date.now(),
            icon_url: randomColor,
            admin: false,
          }
        ).save(err => {
          if (err) {return next(err);}
          res.redirect('/');
        });
      })

    }
]

exports.login_user = (req,res,next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/fail'
  })(req,res,next)
}


;

exports.make_post = [

  body('messagetitle').isLength({min: 3, max: 35}).trim(),
  body('messagetext').isLength({min: 3, max: 300}).trim(),

  sanitizeBody('messagetitle').escape(),
  sanitizeBody('messagetext').escape(),

  (req,res,next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('error', {errors: errors.array()});
        return;
      } else {



    // let tags = req.body.messagetags;
    // tags = tags.replace(" ", '_').split('#');
    // console.log(tags);
    // tags = tags.filter(el => {
    //   if (el) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });

    var post = new Post(
      {
        title: req.body.messagetitle,
        author: req.user._id,
        date_created: Date.now(),
        message: req.body.messagetext,
      }
    ).save(err => {
      if (err) {return next(err);}
      res.redirect('/');
    })
}
}


]

exports.logout_user = (req,res,next) => {
  req.logout();
  res.redirect('/');
}


exports.delete_post = (req,res,next) => {
  Post.findByIdAndRemove(req.params.id, function(err) {
    if (err) {return next(err);}
    res.redirect('/');
  })
}
