var express = require('express');
var router = express.Router();
var models = require("../models");
// load Article model
var Article = models.Article;

/* GET archieve listing. */
router.get('/', function(req, res, next) {
    var isAdmin = req.session.admin ? true : false;
    Article.find({}, function(err, articles){
        if (err) throw err;
        res.render('article/article', {articleList: articles, isAdmin: isAdmin});
    })

});

// write article
router.get('/create', function(req, res, next) {
    if (!req.session.admin){
        res.send('Need admin!');
    }
    var isAdmin = req.session.admin ? true : false;
    if (!req.session.admin){
        res.send('Need admin!');
    }
    res.render('article/create', {isAdmin: isAdmin});

});

// create/submit article
router.post('/create/submit', function(req, res, next) {
    if (!req.session.admin){
        res.send('Need admin!');
    }
    var articleData = req.body;
    var articleInstance = new Article({
        title: articleData.title,
        abstract: articleData.abstract,
        body: articleData.body,
        author: "王思霖",
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
    var isAdmin = req.session.admin ? true : false;
    var articleId = "";
    if(req.query.id){
        articleId = req.query.id;
    }else{
        articleId = req.session.articleId;
    }
    Article.findOne({_id: articleId}, function(err, article){
        if (err) throw err;
        res.render("article/show", {article: article, isAdmin: isAdmin});
    });
});

// edit article
router.get('/edit', function(req, res, next) {
    if (!req.session.admin){
        res.send('Need admin!');
    }
    var isAdmin = req.session.admin ? true : false;
    if (!req.session.admin){
        res.send('Need admin!');
    }
    var articleId = req.query.id;
    Article.findOne({_id: articleId}, function(err, article){
        if (err) throw err;
        res.render("article/edit", {article: article, isAdmin: isAdmin});
    });
});

// edit/submit article
router.post('/edit/submit', function(req, res, next) {
    if (!req.session.admin){
        res.send('Need admin!');
    }
    var articleData = req.body;
    console.log(articleData.articleId);
    Article.findOneAndUpdate({_id: articleData.articleId}, {
        title: articleData.title,
        abstract: articleData.abstract,
        body: articleData.body,
        updated_at: new Date()
    }, function(err, article){
        if (err) throw err;
        res.redirect("/article/show?id=" + article._id);
    });
});

// delete article
router.get('/delete', function(req, res, next) {
    if (!req.session.admin){
        res.send('Need admin!');
    }
    var articleId = req.query.id;
    Article.findOneAndRemove({_id: articleId}, function(err){
        if (err) throw err;
        res.redirect("/article")
    });
});

// submit comment
router.post('/submitComment', function(req, res, next){
    var commentData = req.body;
    Article.findOneAndUpdate({_id: commentData.articleId}, {$push: {comment:
        {
            person: commentData.person,
            comment: commentData.comment,
            created_at: new Date()
        }
    }}, {new: true}, function(err, article){
        if (err) throw err;
        res.redirect("/article/show?id=" + commentData.articleId)
    });
});

// delete comment
router.get('/deleteComment', function(req, res, next){
    if (!req.session.admin){
        res.send('Need admin!');
    }
    var articleId = req.query.articleId;
    var commentId = req.query.commentId;
    Article.findOneAndUpdate({_id: articleId}, {$pull: {comment: {_id: commentId}
    }}, {new: true}, function(err, article){
        if (err) throw err;
        res.redirect("/article/show?id=" + articleId)
    });
});

module.exports = router;
