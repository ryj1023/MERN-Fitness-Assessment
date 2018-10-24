const express = require('express');
const mongoose = require('mongoose');
const Users = require('./models/User-info.model.js');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser')


// Configuration
// ================================================================================================
require('dotenv').config();
// Set up Mongoose
mongoose.connect(process.env.MONGOLAB_URI, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;

mongoose.connection.once('open', function() {
  console.log('mongo connected');                      
});

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const _app = next({ dev })
const handle = _app.getRequestHandler()
_app.prepare()
.then(() => {
  const app = express()
  app.use(expressValidator())
  app.use(bodyParser.json())

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
               dietInfo: {
                 calories: req.body.calories,
                 protein: req.body.protein,
                 fat: req.body.fat,
                 carbs: req.body.carbs,
               },
                 workouts: req.body.programs,
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
    Users.find({"user.email" : req.query.email, "user.password": req.query.password }, '-user.password', (err, user) => {
      console.log('user', user)
      if (err) return res.status(500).send(err)
      res.json(user)
    })
  });

  app.get('/api/user-data', (req, res, next) => {
    Users.find({"user.email" : req.query.email }, '-user.password', (err, user) => {
      if (err) return res.status(500).send(err)
      res.json(user)
    })
  });

  app.post('/api/save-food-items', (req, res) => {
    Users.findOneAndUpdate(
      { 'user.email': req.body.email },
      {
        $push: { 
          'user.userDietSummary': req.body.userDietSummary
        },
        //'user.userDietSummary': req.body.userDietSummary
      },{
        new: true
      },
      (err, doc) => {
        console.log('err', err)
        console.log('doc', doc)
        if (err) return res.status(500).send(err);
        res.status(201).json(doc)
      }
    )
    /*
            user: {
          userName: String,
          email: String,
          password: String,
          dietInfo: {
            calories: Number,
            protein: Number,
            fat: Number,
            carbs: Number,
          },
          userDietSummary: [
            { foodName: String ,
            foodFacts: [] },
          ], 
          workouts: [String]
        }
    */
  })

  app.post('/api/save', (req, res, next) => {
    Users.findOneAndUpdate(
      { 'user.email': req.body.email },
      {
        'user.dietInfo.calories': req.body.userData.calories,
        'user.dietInfo.protein': req.body.userData.protein,
        'user.dietInfo.fat': req.body.userData.fat,
        'user.dietInfo.carbs': req.body.userData.carbs,
        'user.workouts': req.body.programs,
      },
      { new: true },
      (err, doc) => {
        if (err) return res.send(500, { error: err });
        res.status(201).json(doc)
      }
    )
  })
    
  app.get('*', (req, res) => {
    return handle(req, res)
  })
    
  app.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

//module.exports = app;
