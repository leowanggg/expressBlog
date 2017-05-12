var express = require('express');
var router = express.Router();
var models = require("../models");
// load Article model
var Message = models.Message;

/* GET home page. */
router.get('/', function(req, res, next) {
    if (!req.session.admin){
        res.send('Need admin!');
    }
    var isAdmin = req.session.admin ? true : false;
    Message.find({}, function(err, messages){
        if (err) throw err;
        res.render('message/message', {messages: messages, isAdmin: isAdmin});
    })
});

// submit message
router.post('/submit', function(req, res, next){
    var msgData = req.body;
    var messageInstance = new Message({
        email: msgData.email,
        body: msgData.msg,
        created_at: new Date()
    });
    messageInstance.save(function(err, message){
        if (err) throw err;
        res.redirect('/about');
    });
});

// delete message
router.get('/delete',function(req, res, next){
    var msgId = req.query.id;
    Message.findOneAndRemove({_id: msgId}, function(err, msg){
        if (err) throw err;
        res.redirect('/message');
    });
});

module.exports = router;
