var express = require('express');
var router = express.Router();
var BlogPost = require('../schema/BlogPost');

// Get All Blog Posts
router.get('/', (req, res) => {
    BlogPost.find({})
    .then(blog => {
        res.json(blog);
    })
    .catch(err => {
        res.status(404).json({success: false, result: err.json})
    })
});

// Get Specific Blog Post
router.get('/:id', (req, res) => {
    BlogPost.findById(req.params.id)
        .then(blog => res.json(blog))
        .catch(err => res.status(404).json({success: false, result: err.json}))
});

// Create New Blog Post
router.post('/', (req, res) => {
    const newBlog = new BlogPost({
        image: req.body.image,
        title: req.body.title,
        excerpt: req.body.excerpt,
        content: req.body.content,
        datePublished: req.body.datePublished,
        readingTime: req.body.readingTime,
        isFinished: req.body.isFinished,
    });

    newBlog.save()
        .then(blog => {
            res.json(blog)
        })
        .catch(err => {
            res.status(404).json(err)
        });
});

// Remove Blog Post
router.delete('/:id', (req, res) => {
    BlogPost.findById(req.params.id)
        .then(
            blog => blog.remove()
            .then(() => {
                res.json({success: true})
            })
            .catch(() => {
                res.json({success: false})
            })
        ).catch(() => {
            res.status(404).json({success: false})
        })
});

// Update Blog Post
router.put('/:id', (req, res) => {
    BlogPost.updateOne(
        { _id: req.params.id }, 
        {
            $set: {
                image: req.body.image,
                title: req.body.title,
                excerpt: req.body.excerpt,
                content: req.body.content,
                datePublished: req.body.datePublished,
                readingTime: req.body.readingTime,
                isFinished: req.body.isFinished
            }
        })
        .then(() =>
            Blog.findById(req.params.id)
            .then(blog => res.json(blog))
            .catch(err => {
                res.status(404).json({success: false, result: err.json})
            })
        ).catch(err => {
            res.status(404).json({success: false, result: err})
        });
});

module.exports = router;