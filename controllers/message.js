const { validationResult } = require('express-validator/check');
const Message = require('../models/message');

// Nouveau message
exports.sendMessage = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Erreur, le message n\'a pas pu être ajouté.',
            errors: errors.array()
        });
    }
    // Récupère les élèments saisies par l'utilisateur
    const title = req.body.title;
    const message = req.body.message;
    const messageSchema = new Message({
        title: title,
        message: message
    });
    // Enregistrement dans la base de données
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

// Affichage du message
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

// SUppression de message
exports.deleteMessage = (req, res, next) => {
    const messageId = req.params.id;
    console.log('req.params.id: ', req.params.id)
    Message.findById(messageId)
        .then(message => {
            if (!message) {
                const error = new Error('Le message n\'existe pas.');
                error.statusCode = 404;
                throw error;
            }
            return Message.findByIdAndRemove(messageId);
        })
        .then(result => {
            console.log(result);
            res.status(200).json({ message: 'Message supprimé.' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

// Modification de message
exports.updatePost = (req, res, next) => {
    const messageId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Erreur de modification.');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const message = req.body.message;
    Message.findById(messageId)
        .then(obj => {
            if (!obj) {
                const error = new Error('Le message n\'existe pas.');
                error.statusCode = 404;
                throw error;
            }
            obj.title = title;
            obj.message = message;
            return obj.save();
        })
        .then(result => {
            res.status(200).json({ log: 'Message mis à jour.', message: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};