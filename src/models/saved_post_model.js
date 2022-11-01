const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedPost = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
}, { timestamps: true });

module.exports = mongoose.model('savedPost', savedPost);