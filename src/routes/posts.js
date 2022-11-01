const router = require('express').Router();
const users = require('../models/user_model')
const posts = require('../models/post_model')

router.post('/tweet/create/:username', (req, res) => {
    try {
        const corpusTweet = req.body.corpus
        const username = req.params.username
        users.findOne({ 'username': username }, (err, user) => {
            const user_id = user._id
            new posts({
                corpus: corpusTweet,
                author: user_id
            }).save().then(result => {
                res.send({ "message": "tweet successfully saved" })
            })
        });
    } catch (error) {
        res.status(500).json({ "error": error });
    }

});

router.get('/', (req, res) => {
    try {
        posts.find({}, function (err, posts) {
            let userPost = {}

            posts.forEach(function (post) {
                userPost[post._id] = post;
            });
            res.send(userPost)
        });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
});

router.get('/:username', (req, res) => {
    try {
        const username = req.params.username
        users.findOne({'username': username}, (err, user) =>{
            posts.findOne({'author': user._id}, (err, post) => {
                res.send(post)
            });
        });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
});

router.patch('/tweet/update/:id', (req, res) => {
    try {
        const post_id = req.params.id
        const userBodyCorpus = req.body.corpus
        posts.updateOne({'_id': post_id}, {$set: {corpus: userBodyCorpus}}).then(result => {
            res.status(200).send({"message": "post successfully updated"})
        });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
});

router.delete('/tweet/delete/:id', (req, res) => {
    try {   
        const post_id = req.params.id
        posts.deleteOne({'_id': post_id}, (result) => {
            res.status(200).send({"message": "post successfully deleted"})
        });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
});

module.exports = router;