const PriceHistory = require('../model/product_price_model');
const express = require('express');
const { SeperateNonAttribParams } = require('../util/paramhelper');


const route = express.Router();


route.use(express.json());


route.get('/price', async (req, res)=>{
    try {
        if(!req.query.product_id){
            res.status(400).json({error: 'product_id missing!'});
            return;
        }
       
        let hist = await PriceHistory.find({"product_id": req.query.product_id});
    
        if(hist){
            res.status(200).json(hist);
        }
        else{
            res.status(404).json({error: `No data found for product_id: ${product_id}`});
        }
        
    } catch (error) {
        res.status(500).json({error: `Internal Server Error ${error}`});
    }
})


module.exports = route;