const mongoose = require('mongoose');
const shortid = require('shortid');

const urlSchema = new mongoose.Schema({
    originalUrl:{
        type: String,
        required: true,
    },
    shortUrl:{
        type:String,
        required:true,
        default:shortid.generate,
    },
    clicks:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

module.exports = mongoose.model('Url', urlSchema);
// This model defines the structure of the URL documents in the MongoDB database.