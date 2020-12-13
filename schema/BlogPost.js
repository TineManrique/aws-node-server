const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: String,
    readingTime: String,
    datePublished: { 
        type: Date,
        default: Date.now
    },
    content: String,
    excerpt: String,
    isFinished: Boolean
});

module.exports = BlogPost = mongoose.model('BlogPost', BlogPostSchema);