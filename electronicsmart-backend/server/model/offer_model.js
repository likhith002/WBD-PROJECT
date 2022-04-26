const mongoose = require('mongoose');



let OfferSchema = mongoose.Schema({
    type:{
        type:String,
        required: true,
    },
    id:{
        type: Number,
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
    info:{
        type:String,
        required:true,
    },
    itemName:{
        type:String,
        required:true,
    },
    path:{
        type:String,
        required:true,
    }
})






module.exports = mongoose.model('offer', OfferSchema, 'offers');