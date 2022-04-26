const express = require('express');
const Offer = require('../model/offer_model');


const route = express.Router()


route.use(express.json())



route.get('/offer', async (req, res)=>{
    try {
        let result;
        if(req.query.type){
            result = await Offer.find({type: req.query.type});
        }   
        else{
            result = await Offer.find();
        }
    if(result)
        res.status(200).json(result);
    else    
        res.status(404).json({error: 'No offer found!'});
        
    } catch (error) {
        res.status(500).json({error: `Internal Server Error ${error}`});
    }
})



route.put('/removeme', async (req, res)=>{
    let tt = new Offer(req.body);
    let rs = await tt.save();
    res.json(rs);
})


module.exports = route;






