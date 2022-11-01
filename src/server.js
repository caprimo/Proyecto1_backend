const express = require('express');
const cors = require('cors');

function createServer () {
    const app = express();

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/users', require('./routes/users'));
    app.use('/publicaciones/tweets', require('./routes/posts'))
    app.use('/followers', require('./routes/follows'))
    app.use('/likes', require('./routes/likes'))
    app.use('/timeline', require('./routes/timeline'))
    app.use(async (req, res) => {
        res.status(404).json({ error: "Not found" });
    });

    return app;
}

module.exports = createServer;