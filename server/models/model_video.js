const mongoose = require('mongoose');

//things like submitter are required false for dev purposes but should later
//be changed to required true
const VideoSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    channelTitle: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: Array, required: true },
    userDescription: {type: String, required: false },
    addedBy: { type: String, required: false },
    likes: { type: Number, required: false },
    //for now category is a string, something like an array might make
    //more sense because some videos could fit multiple categories
    //for now I will enforce one category per video
    category: { type: String, required: false }
    //dateAdded: { type: Number, required: true }
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;