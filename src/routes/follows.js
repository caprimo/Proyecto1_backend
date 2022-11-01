const router = require('express').Router();
const users = require('../models/user_model')
const follows = require('../models/follow_model')

router.post('/follow', (req, res) =>{
    const follower = req.query.follower
    const followed = req.query.followed
    users.findOne({'username': follower}, (err, userFollower) =>{
        users.findOne({'username': followed}, (err, userFollowed) => {
            new follows({
                follower: userFollower._id,
                followed: userFollowed._id
            }).save().then(result =>{
                res.status(200).send({"message": "follow successfully saved"})
            });
        });
    });
});

router.get('/followers/:username', (req, res) =>{
    const username = req.params.username
    let user = username => {return users.findOne({username: username}).then(user => user)}
    let followFollowed = userID => {return follows.find({follower: userID}).then(followedsIDs => followedsIDs)}
    let userWithID = userID => {return users.findOne({_id: userID}).then(user => user)}
    user(username).then(userData=> followFollowed(userData._id).then(async (followedsIDs) => {
        let resultArray = []
        await followedsIDs.forEach(element => {
            resultArray.push(userWithID(element.followed).then(result => result))
        });
        Promise.all(resultArray).then(data => {
            res.status(200).send(data)
        });
    }));
});

router.get('/followeds/:username/', (req, res) =>{
    const username = req.params.username
    let user = username => {return users.findOne({username: username}).then(user => user)}
    let followFollower= userID => {return follows.find({followed: userID}).then(followersIDs => followersIDs)}
    let userWithID = userID => {return users.findOne({_id: userID}).then(user => user)}
    user(username).then(userData=> followFollower(userData._id).then(async (followersIDs) => {
        let resultArray = [];
        await followersIDs.forEach(element => {
            resultArray.push(userWithID(element.follower).then(result => result))
        });
        Promise.all(resultArray).then(data => {
            res.status(200).send(data)
        });
    }));
});

router.delete('/user/:username', (req, res) => {
    const username = req.params.username
    const usernameUnfollow = req.query.unfollow
    let user = username => {return users.findOne({username: username}).then(user => user)}
    user(username).then(userData => {
        user(usernameUnfollow).then(userUnfollow => {
            follows.deleteOne({follower: userData._id, followed: userUnfollow._id}, (result) =>{
                res.status(200).send({"message": "unfollow successfully"})
            });
        });
    });
});

module.exports = router;