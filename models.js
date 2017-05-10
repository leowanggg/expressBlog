// Import the mongoose module
var mongoose = require("mongoose");

// Define a schema
var Schema = mongoose.Schema;
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

// create a model using the Schema
var Article = mongoose.model('Article', articleSchema);

// export
module.exports = {
    "Article": Article
};
