const router = require('express').Router();
const users = require('../models/user_model')
const likePost = require('../models/like_post_models')
const posts = require('../models/post_model')

router.post('/user/:username/like', (req, res) => {
    const username = req.params.username
    const postID = req.query.postID
    let user = username => {return users.findOne({username: username}).then(user => user)}
    user(username).then(user =>{
        new likePost({
            user: user._id,
            post: postID
        }).save().then(res.status(200).send({"message": "like successfully saved"}));
    })
});

router.get('/user/:username/likes', (req, res) => {
    const username = req.params.username
    let user = username => {return users.findOne({username: username}).then(user => user)}
    user(username).then(user => {
        likePost.find({user: user._id}).then(likedPosts => {
            likedPostArray = []
            likedPosts.forEach(likedPost => {
                likedPostArray.push(posts.findById({_id: likedPost.post}).then(result => result));
            });
            Promise.all(likedPostArray).then(data => {
                res.status(200).send(data)
            });
        });
    });
});

router.delete('/user/:username/delete', (req, res) => {
    const username = req.params.username
    const postID = req.query.postID
    let user = username => {return users.findOne({username: username}).then(user => user)}
    user(username).then(user => {
        likePost.deleteOne({user: user._id, post: postID}).then(res.status(200).send({"message": "like successfully removed"}))
    });
});


module.exports = router;