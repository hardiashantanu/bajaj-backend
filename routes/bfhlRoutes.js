const express = require('express');
const router = express.Router();
const { processBfhlData } = require('../controller/bfhlController.js');

// POST request to handle data processing
router.post('/bfhl', processBfhlData);

// GET request for the operation code
router.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

module.exports = router;
