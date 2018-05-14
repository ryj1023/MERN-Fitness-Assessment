const Users = require('../../models/User-info.model.js');
const request = require('request');
const axios = require('axios');
module.exports = (app) => {
  app.get('/api/sign-up', (req, res, next) => {
    res.render('index', {title: 'validator', success: req.session.success, errors: req.session.errors})
    req.session.errors = null;
    });

    app.post('/api/validation', (req, res, next) => {
     req.checkBody('email', 'Invalid Email Address').isEmail();
     req.checkBody('password', 'Password Is Too Short').isLength({min: 4})
     req.checkBody('password', 'passwords don\'t match').equals(req.body.confirmPassword) // checks to see if the password and confirmPassword values match
     let errors = req.validationErrors();
     if (errors) {
       res.json(errors)
       errors = null;
     } else {
       res.send('validated');
     }
      // req.session.errors = null; // clears errors after shown to the user
    });

    app.post('/api/validation/create-user', (req, res) => {
      Users.find({"user.email" : req.body.email}, (err, user) => {
        if (err) return res.status(500).send(err)
          if (user.length === 0) {
            const post = new Users({
              user: {
               email: req.body.email,
               userName: req.body.userName,
               password: req.body.password,
              }
            })
            post.save((err, post) => {
              if (err) { return next(err) }
              res.status(201).json(post)
            })
          } else {
            res.json('There is already an account with this email.')
          }
      })
    })

  app.get('/api/login', (req, res, next) => {
    Users.find({"user.email" : req.query.email, "user.password": req.query.password }, 'user.userName user.workouts user.dietInfo', (err, user) => {
      if (err) return res.status(500).send(err)
      res.json(user)
    })
  });

  app.post('/api/save', (req, res, next) => {
    var post = new Users({
      user: {
       userName: req.body.userName.userName,
       dietInfo: {
        calories: req.body.userData.dailyCalories,
        protein: req.body.userData.dailyProtein,
        fat: req.body.userData.dailyFats,
        carbs: req.body.userData.dailyCarbs,
        },
        workouts: req.body.userData.programs
      }
    })
    post.save(function (err, post) {
      console.log('post', post)
      if (err) { return next(err) }
      res.status(201).json(post)
      console.log('err', err)
    })
  })
}
