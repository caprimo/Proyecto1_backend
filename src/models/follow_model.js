const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    followed: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
}, { timestamps: true });

module.exports = mongoose.model('follows', followSchema);
