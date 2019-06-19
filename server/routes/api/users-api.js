const Users = require('../../models/User-info.model.js')
const request = require('request')
const axios = require('axios')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
module.exports = app => {
    app.use(expressValidator())
    app.use(bodyParser.json())

    app.get('/api/sign-up', (req, res, next) => {
        res.render('index', {
            title: 'validator',
            success: req.session.success,
            errors: req.session.errors,
        })
        req.session.errors = null
    })

    app.post('/api/validation', (req, res, next) => {
        req.checkBody('email', 'Invalid Email Address').isEmail()
        req.checkBody('password', 'Password Is Too Short').isLength({ min: 4 })
        req.checkBody('password', "passwords don't match").equals(
            req.body.confirmPassword
        ) // checks to see if the password and confirmPassword values match
        let errors = req.validationErrors()
        if (errors) {
            res.json(errors)
            errors = null
        } else {
            res.send('validated')
        }
        // req.session.errors = null; // clears errors after shown to the user
    })

    app.post('/api/validation/create-user', (req, res) => {
        Users.find({ 'user.email': req.body.email }, (err, user) => {
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
                    },
                })
                post.save((err, post) => {
                    if (err) {
                        return next(err)
                    }
                    res.status(201).json(post)
                })
            } else {
                res.json('There is already an account with this email.')
            }
        })
    })

    app.get('/api/login', (req, res, next) => {
        Users.find(
            {
                'user.email': req.query.email,
                'user.password': req.query.password,
            },
            '-user.password',
            (err, user) => {
                console.log('user', user)
                if (err) return res.status(500).send(err)
                res.json(user)
            }
        )
    })

    app.get('/api/user-data', (req, res, next) => {
        console.log('user data request')
        Users.find(
            { 'user.email': req.query.email },
            '-user.password',
            (err, user) => {
                if (err) res.status(500).send(err)
                res.json(user)
            }
        )
    })

    app.post('/api/remove-food-item', (req, res) => {
        // first you need to set the desired data to a blank value before you can pull the data from the database
        Users.findOneAndUpdate(
            {
                'user.userName': req.body.userName,
                'user.userDietSummary': {
                    $elemMatch: { foodName: req.body.foodName },
                },
            },
            { $unset: { 'user.userDietSummary.$': '' } },
            {
                new: true,
                multi: false,
            },
            (err, doc) => {
                Users.findOneAndUpdate(
                    { 'user.userName': req.body.userName },
                    { $pull: { 'user.userDietSummary': null } },
                    {
                        new: true,
                        multi: false,
                    },
                    (err, doc) => {
                        console.log('doc', doc)
                        if (err) return res.send(500, { error: err })
                        res.status(201).json(doc)
                    }
                )
            }
        )
    })

    app.post('/api/save-food-items', (req, res) => {
        Users.findOneAndUpdate(
            { 'user.email': req.body.email },
            {
                $push: {
                    'user.userDietSummary': req.body.userDietSummary,
                },
            },
            {
                new: true,
            },
            (err, doc) => {
                if (err) return res.status(500).send(err)
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
                'user.dietInfo.calories': req.body.dietGoals.calories,
                'user.dietInfo.protein': req.body.dietGoals.protein,
                'user.dietInfo.fat': req.body.dietGoals.fat,
                'user.dietInfo.carbs': req.body.dietGoals.carbs,
                'user.workouts': req.body.dietGoals.programs,
            },
            { new: true },
            (err, doc) => {
                if (err) return res.send(500, { error: err })
                res.status(201).json(doc)
            }
        )
    })

    app.post('/api/get-recipe-list', async (req, res) => {
        try {
            const result = await axios.get(
                `https://www.food2fork.com/api/search?key=b8f037b60af8bae003524600f318b67f&q=${encodeURI(
                    req.body.foodKey
                )}`
            )
            res.json(result.data)
        } catch (err) {
            console.log('err', err)
        }
    })
}
