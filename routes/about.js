var express = require('express');
var router = express.Router();
var models = require("../models");
// load Article model
var Message = models.Message;

/* GET home page. */
router.get('/', function(req, res, next) {
    var isAdmin = req.session.admin ? true : false;
    res.render('about/about', {isAdmin: isAdmin});
});

module.exports = router;
