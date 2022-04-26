const Product = require('../model/product_model');
const express = require('express');
const {SeperateNonAttribParams, SeperateAttribParams} = require('../util/paramhelper');


const route = express.Router()


route.use(express.json())


// idempotent, add custom middleware to handle file uploads
route.put('/product', async (req, res) => {

    try {
        let pre_insert_check = await Product.findOne({ name: req.body.name })
        if(pre_insert_check){
            console.log('exists!');
            res.status(200).json(pre_insert_check);
        }
        else{
            let product = new Product(req.body);
            let status = await product.save();
            if(status){
                res.status(200).json(status); 
            }
        }   
    } catch (Err) {
        res.status(500).json({'error': `Internal Server Failure! ${Err}`});
    }
})


route.get('/product', async (req, res) => {

    try {
        console.log(req.query); 
        let params = SeperateNonAttribParams(Product , req.query);
        console.log(req.query);
        let limit = params.limit || 50;
        let page = params.page || 0;

        let query;

        query = Product.find({...req.query}, '-__v');

        if(params.price_max){
            query = query.where('price').lte(params.price_max);
        }

        if(params.price_min){
            query = query.where('price').gte(params.price_min);
        }

        //ram
        if(params.ram_max){
            query = query.where('ram').lte(params.ram_max);
        }

        if(params.ram_min){
            query = query.where('ram').gte(params.ram_min);
        }

        //memory
        if(params.memory_max){
            query = query.where('memory').lte(params.memory_max);
        }

        if(params.memory_min){
            query = query.where('memory').gte(params.memory_min);
        }


        // if((params.price_max && params.price_min) && (params.price_max!=undefined && params.price_min!=undefined)){
        //     console.log(1)
        //     query = query.where('price').gte(params.price_min).lte(params.price_min);
        // }

        // if((params.ram_max && params.ram_min) && (params.ram_max!=undefined && params.ram_min!=undefined)){
        //     console.log(2)
        //     query = query.where('ram').gte(params.ram_min).lte(params.ram_min);
        // }
        
        // if((params.memory_max && params.memory_min) && (params.memory_max!=undefined && params.memory_min!=undefined)){
        //     console.log(3)
        //     query = query.where('memory').gte(params.memory_min).lte(params.memory_min);
        // }

        //pagination
        let products = await query.sort({price: params.sort || 1}).limit(limit).skip(page*limit); 

        if(products)
            res.status(200).json(products);
        else
            res.status(404).json({error: "Product not found!"});
    } catch (error) {
        res.status(500).json({'error': `Internal Server Failure! ${error}`});
    }


})



// in case of duplicate fields last one is considered
route.patch('/product', async (req, res) => {

    try {
        if (Object.keys(req.query).length === 0) {
            res.status('400').json({ error: 'Invalid params!' });
            return;
        }

        let params = SeperateNonAttribParams(Product, req.query);
        if(params.addpin){
            obj = await Product.findOneAndUpdate(req.query, {$push: {"pin": params.addpin}}, {new: true});
            res.status('200').json(obj);
            return;
        }
        else if(params.removepin){
            let obj = await Product.findOneAndUpdate(req.query, {$pull: {"pin": params.removepin}}, {new: true});
            res.status('200').json(obj);
            return
        }


        

        let updates = SeperateAttribParams(Product, req.body);

        let updatedObject = await Product.findOneAndUpdate(req.query, { $set: updates }, { new: true });
        if (updatedObject) {
            res.status('200').json(updatedObject);
        }
        else {
            res.status('500').json({ error: 'Failed to update object!' });
        }
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error ${error}` });
    }

})


route.get('/search', async (req, res) => {
    try {
        if (!req.query.q) {
            res.sendStatus(400);
            return;
        }

        let results;
        results = await Product.aggregate([{
            $search: {
                index: 'auto',
                autocomplete: {
                    query: req.query.q,
                    path: 'name'
                },
            }
        },
        {
            $project: {
                name: 1,
                __id: 1
            }
        },
        {
            $limit: 10
        }
        ])

        if (results.length) {
            res.status(200).json(results);
        }
        else {
            res.status(404).json([]);// don't change
        }
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error ${error}` })
    }
})


module.exports = route;


// function QueryHelper(query, keys){

//     for(let key of keys){


//         if((params.price_max && params.price_min) && (params.price_max!==undefined && params.price_min!==undefined)){
//             query = query.where('price').gte(params.price_min).lte(params.price_min);
//         }

//     }


//     return query;
// }