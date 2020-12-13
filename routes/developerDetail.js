var express = require('express');
var router = express.Router();
var DevDetails = require('../schema/DeveloperDetail');

// Get All Developer Details
router.get('/', (req, res) => {
    DevDetails.find()
    .then(details => {
        res.json(details);
    })
    .catch(err => {
        res.status(404).json({success: false, result: err.json})
    })
});

module.exports = router;