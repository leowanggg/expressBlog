var express = require('express');
var router = express.Router();
var models = require("../models");
// load Article model
var Admin = models.Admin;

/* GET home page. */
router.get('/', function(req, res, next) {
    var isAdmin = req.session.admin ? true : false;
    res.render('index', {isAdmin: isAdmin});
});

// administrator sign in
router.post('/adminSignin', function(req, res, next){
    var adminInfo = req.body;
    console.log(req.headers.referer.substr(21));
    Admin.findOneAndUpdate({email: adminInfo.email}, {signin_at: new Date()}, {new: true},function(err, admin){
        if (err) throw err;
        if (adminInfo.password === admin.password){
            req.session.admin = admin;
            res.redirect(req.headers.referer.substr(21));
        }else{
            res.send("invalid password")
        }
    })
})
// administrator sign out
router.get('/adminSignout', function(req, res, next){
    req.session.admin = null;
    res.redirect(req.headers.referer.substr(21));
});


// **************************************************
// for creating a admin instance in Database
// router.post('/admin', function(req, res, next) {
//     var adminInfo = req.body;
//     var adminInstance = new Admin({
//         email: adminInfo.email,
//         password: adminInfo.password,
//         created_at: new Date(),
//         signin_at: new Date()
//     });
//     adminInstance.save(function(err, admin){
//         if (err) throw err;
//         req.session.admin = admin;
//         res.send("success!")
//     })
// });
// ***************************************************

module.exports = router;
