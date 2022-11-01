const router = require('express').Router();
const users = require('../models/user_model')

router.get('/', (req, res) => {
    try {
        users.find({}, function (err, users) {
            let userMap = {}

            users.forEach(function (user) {
                userMap[user._id] = user;
            });
            res.send(userMap)
        });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
});

router.get('/user/:username', (req, res) => {
    try {
        users.findOne({'username': req.params.username}, (err, user) => {
            res.status(200).send(user)    
        });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
})

router.post('/user/create', (req, res) => {
    try {
        const userBody = req.body
        const user = new users(userBody)
        user.save().then(result => {
           res.status(200).send({"message": "user successfully saved"})
        });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
});

router.patch('/user/update/:username', (req, res) => {
    try {
        const username = req.params.username
        const userBody = req.body
        users.updateOne({'username': username}, {$set: userBody}).then(result => {
            res.status(200).send({"message": "user successfully updated"})
        });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
});

router.delete('/user/delete/:username', (req, res) => {
    try {
        const username = req.params.username
        users.deleteOne({'username': username}).then(result => {
        res.status(200).send({"message": "user successfully deleted"})
    });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
    
});

module.exports = router;