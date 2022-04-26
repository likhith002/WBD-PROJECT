const mongoose = require('mongoose');



let price_schema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
    },
    data : [
        {
            "name":{
                type: String,
                required: true
            },
            price:{
                type: Number,
                required: true
            },
            amt: {
                type: Number,
                required: true
            }
        }
    ]
})



module.exports = mongoose.model('pricehistory', price_schema);