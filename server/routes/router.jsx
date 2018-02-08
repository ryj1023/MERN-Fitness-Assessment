
var router = require('express').Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var App = require('../../client/app/index.js');

router.get('*', function(request, response) {
    var props = { title: 'Universal React' };
    var html = ReactDOMServer.renderToString(
        React.createElement(App, props)
    );
    response.send(html);
});

module.exports = router;