const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    corpus: {
        type: String,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true});

module.exports = mongoose.model('post', postSchema)
