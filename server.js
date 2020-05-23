const express = require('express')
const mongoose = require('mongoose')
const Users = require('./server/models/User-info.model.js')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const app = express()
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const _app = next({ dev })
const handle = _app.getRequestHandler()
const port = process.env.PORT || 3000
// const path = require('path')
require('./server/routes/api/users-api')(app)
require('dotenv').config()
mongoose.connect(process.env.MONGOLAB_URI, {
    useMongoClient: true,
})
mongoose.Promise = global.Promise
mongoose.connection.once('open', function() {
    console.log('mongo connected')
})
_app.prepare()
    .then(() => {
        // app.get('/service-worker.js', function(request, response) {
        //     response.sendFile(
        //         path.resolve(__dirname, './.next', 'service-worker.js')
        //     )
        // })
        // app.use(handler).listen(3000)
        app.get('*', (req, res) => {
            return handle(req, res)
        })

        app.listen(port, err => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })
