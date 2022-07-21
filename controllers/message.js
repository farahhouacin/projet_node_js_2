const { validationResult } = require('express-validator/check');
const Message = require('../models/message');
// Function for send message
exports.sendMessage = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Erreur, le message n\'a pas pu être ajouté.',
            errors: errors.array()
        });
    }
    //Create a message from element of th request
    const title = req.body.title;
    const message = req.body.message;
    const messageSchema = new Message({
        title: title,
        message: message
    });
    //Save the message in database
    messageSchema
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Message ajouté.',
                post: result
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getMessage = (req, res, next) => {
    Message.find().select(['title', 'message'])
        .then(messages => {
            res
                .status(200)
                .json({ log: 'Message ajouté.', message: messages });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
