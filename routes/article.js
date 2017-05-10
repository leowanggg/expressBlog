var express = require('express');
var router = express.Router();
var models = require("../models");
// load Article model
var Article = models.Article;

/* GET archieve listing. */
router.get('/', function(req, res, next) {
    Article.find({}, function(err, articles){
        if (err) throw err;
        res.render('article', {articleList: articles});
    })

});

// write article
router.get('/create', function(req, res, next) {
  res.render('create');
});

// create/submit article
router.post('/create/submit', function(req, res, next) {
    var articleData = req.body;
    var articleInstance = new Article({
        title: articleData.title,
        abstract: articleData.abstract,
        body: articleData.body,
        author: "Silin",
        comment:[{
            person: null,
            comment: null,
            created_at: null
        }],
        created_at: new Date(),
        updated_at: new Date()
    });
    articleInstance.save(function(err, article){
        if (err) throw err;
        req.session.articleId = article["_id"];
        res.redirect("/article/show");
    })

});

// show article
router.get('/show', function(req, res, next) {
    var articleId = "";
    if(req.query.id){
        articleId = req.query.id;
    }else{
        articleId = req.session.articleId;
    }
    Article.findOne({_id: articleId}, function(err, article){
        if (err) throw err;
        res.render("show", {article: article});
    });
});

// edit article
router.get('/edit', function(req, res, next) {
    var articleId = req.query.id;
    Article.findOne({_id: articleId}, function(err, article){
        if (err) throw err;
        res.render("edit", {article: article});
    });
});

// edit/submit article
router.post('/edit/submit', function(req, res, next) {
    var articleData = req.body;
    Article.findOneAndUpdate({_id: articleData.id}, {
        title: articleData.title,
        abstract: articleData.abstract,
        body: articleData.body,
        updated_at: new Date()
    }, {new: true}, function(err, article){
        if (err) throw err;
        console.log(article);
        res.redirect("/article/show?" + "id=" + article._id);
    });
});

// delete article
router.get('/delete', function(req, res, next) {
    var articleId = req.query.id;
    Article.findOneAndRemove({_id: articleId}, function(err){
        if (err) throw err;
        res.redirect("/article")
    });
});

module.exports = router;
