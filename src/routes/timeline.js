const router = require('express').Router();
const users = require('../models/user_model')
const posts = require('../models/post_model')
const follows = require('../models/follow_model')

router.get('/:username', async (req, res) => {
    const username = req.params.username
    let user = username => {return users.findOne({username: username}).then(user => user)}
    user(username).then(user => {
        follows.find({follower: user._id}).then(followers => {
            let postArray = []
            followers.forEach(follower => {
                postArray.push(posts.find({author: follower.followed}).then(result => result));
            });
            Promise.all(postArray).then(postData => {
                res.status(200).send(postData.flat().sort((a, b) => {
                    new Date(b['updatedAt']).getTime() - new Date(a['updatedAt']).getTime()
                }));
            })
        });
    });
});

module.exports = router;