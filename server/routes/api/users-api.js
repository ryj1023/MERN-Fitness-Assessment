const Users = require('../../models/User-info.model.js')
const request = require('request')
const axios = require('axios')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const CryptoJS = require('crypto-js')
const get = require('lodash/get')

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
    app.get('/api/get-food-search-keyword', (req, res, next) => {
        const { keyword, offset } = req.query

        axios
            .get(
                `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.USDA_API_KEY}&query=${keyword}`
            )
            .then(response => {
                return res.json(response.data)
            })
            .catch(err => {
                console.log('err', err)
                res.send(err)
                // throw err
            })
    })
    app.get('/api/get-nutrition-facts', (req, res, next) => {
        const { foodId } = req.query

        axios
            .get(
                `https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${process.env.USDA_API_KEY}`
            )
            .then(response => {
                return res.json(response.data)
            })
            .catch(err => {
                console.log('err', err)
                res.send(err)
                // throw err
            })
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
                        password: CryptoJS.AES.encrypt(
                            req.body.password,
                            process.env.SECRET
                        ).toString(),
                        dietGoals: {
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
        const encryptedPassword = CryptoJS.AES.encrypt(
            req.query.password,
            process.env.SECRET
        ).toString()

        Users.find(
            {
                'user.email': req.query.email,
                // 'user.password': req.query.password,
                // 'user.password': encryptedPassword,
            },
            // '-user.password',
            (err, user) => {
                const jsonUser = JSON.stringify(user)
                const password_ = jsonUser[0]
                console.log('password_', password_)
                const passwordFromDatabase =
                    get(user, 'data[0].user.password') || null
                console.log('passwordFromDatabase', passwordFromDatabase)

                // Decrypt
                // var bytes = CryptoJS.AES.decrypt(
                //     passwordFromDatabase,
                //     process.env.SECRET
                // )
                // var originalText = bytes.toString(CryptoJS.enc.Utf8)
                // console.log('originalText', originalText)
                if (err) return res.status(500).send(err)
                res.json(user)
            }
        )
    })
    app.get('/api/user-data', (req, res, next) => {
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
                'user.selectedFoods': {
                    $elemMatch: { foodName: req.body.foodName },
                },
            },
            { $unset: { 'user.selectedFoods.$': '' } },
            {
                new: true,
                multi: false,
            },
            (err, doc) => {
                Users.findOneAndUpdate(
                    { 'user.userName': req.body.userName },
                    { $pull: { 'user.selectedFoods': null } },
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
                    'user.selectedFoods': req.body.selectedFoods,
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
    })
    app.post('/api/save', (req, res, next) => {
        console.log('req.body', req.body)
        Users.findOneAndUpdate(
            { 'user.email': req.body.email },
            // {
            //     'user.dietGoals.calories': req.body.dietGoals.calories,
            //     'user.dietGoals.protein': req.body.dietGoals.protein,
            //     'user.dietGoals.fat': req.body.dietGoals.fats,
            //     'user.dietGoals.carbs': req.body.dietGoals.carbs,
            // },
            {
                'user.dietGoals': req.body.dietGoals,
            },
            { new: true, lean: true },
            (err, doc) => {
                if (err) return res.send(500, { error: err })
                res.status(201).json(doc)
            }
        )
    })
    app.post('/api/get-recipe-list', async (req, res) => {
        try {
            const result = await axios.get(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.RECIPE_API_KEY}&number=5`
            )
            res.json(result.data)
        } catch (err) {
            console.log('err', err)
        }
    })
}
