// Function for send message
exports.sendMessage = (req, res, next) => {
    // Get title and message in the body
    const title = req.body.title;
    const message = req.body.message;

    // Return response
    res.status(201).json({
        message: "Message send",
        post: {title: title, message: message}
    });
}
