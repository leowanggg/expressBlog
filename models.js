// Import the mongoose module
var mongoose = require("mongoose");

// define schemas
var Schema = mongoose.Schema;
// schema for article model
var articleSchema = new Schema({
    title: String,
    abstract: String,
    body: String,
    author: String,
    comment:[{
        person: String,
        comment: String,
        created_at: Date
    }],
    created_at: Date,
    updated_at: Date
});

// schema for administrator model
var adminSchema = new Schema({
    email: String,
    password: String,
    created_at: Date,
    signin_at: Date
});

// schema for contact message
var messageSchema = new Schema({
    email: String,
    body: String,
    created_at: Date
});
// create models using the Schemas
// article model
var Article = mongoose.model('Article', articleSchema);

// administrator model
var Admin = mongoose.model('Admin', adminSchema);

//  contact message model
var Message = mongoose.model('Message', messageSchema);

// export
module.exports = {
    "Article": Article,
    "Admin": Admin,
    "Message": Message
};
