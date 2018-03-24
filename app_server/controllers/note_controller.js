var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};

module.exports.renderHomepage = function(req, res) {

    res.render('index', {title: 'Note'});
};