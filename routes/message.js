// Import all
const express = require('express');
const messageController = require('../controllers/message');
const isAuth = require('../middleware/is-auth');
const { body } = require('express-validator/check');

// Create router
const router = express.Router();

// Get message
router.get('/message', messageController.getMessage);

// Post message
router.post('/message', messageController.sendMessage);


// Delete message
router.delete('/message/:id', isAuth, messageController.deleteMessage);

// Put message
router.put(
    '/message/:id',
    isAuth,
    [
        body('title')
            .trim()
            .isLength({ min: 5 }),
        body('message')
            .trim()
            .isLength({ min: 5 })
    ],
    messageController.updatePost
);

// Export modules
module.exports = router;