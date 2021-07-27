// If I bypass this file and run 'next build' and 'next start', the app will build and run successfully
const { createServer } = require('http')
const { parse } = require('url')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const _app = next({ dev })
const handle = _app.getRequestHandler()
const port = process.env.PORT || 8000
const path = require('path')
const CryptoJS = require('crypto-js')
require('./server/routes/api/users-api')(app)

require('dotenv').config()
mongoose.connect(process.env.MONGOLAB_URI)
mongoose.Promise = global.Promise
mongoose.connection.once('open', function() {
    console.log('mongo connected')
})

// const MongoClient = require('mongodb').MongoClient

// const client = new MongoClient(process.env.MONGOLAB_URI, {
//     useNewUrlParser: true,
// })
// client.connect(err => {
//     if (err) throw err
//     const collection = client.db('test').collection('devices')
//     // perform actions on the collection object
//     console.log('DB CONNECTION SUCCESS!')
//     client.close()
// })

_app.prepare()
    .then(() => {
        app.get('/service-worker.js', function(request, response) {
            response.sendFile(
                path.resolve(__dirname, './.next', 'service-worker.js')
            )
        })
        app.use(handle).listen(3000)
        app.get('*', (req, res) => {
            return handle(req, res)
        })
        app.listen(port, err => {
            if (err) throw err

            console.log('> Ready on http://localhost:8000')
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })

// _app.prepare().then(() => {
//     createServer((req, res) => {
//         // Be sure to pass `true` as the second argument to `url.parse`.
//         // This tells it to parse the query portion of the URL.
//         const parsedUrl = parse(req.url, true)
//         const { pathname, query } = parsedUrl

//         if (pathname === '/a') {
//             _app.render(req, res, '/a', query)
//         } else if (pathname === '/b') {
//             _app.render(req, res, '/b', query)
//         } else {
//             handle(req, res, parsedUrl)
//         }
//     }).listen(3000, err => {
//         if (err) throw err
//         console.log('> Ready on http://localhost:3000')
//     })
// })
