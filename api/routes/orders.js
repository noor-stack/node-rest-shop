const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = ('../models/order');

router.get('/',(req,res,next) =>{
    const order = new Order({
        _id: mongoose.Schema.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order
    .save()
    .exec()
    .then(result => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })

    

    res.status(200).json({
        message:"orders were fetched"
    });
});

router.post('/',(req,res,next) =>{
    const order = {
        productId : req.body.productId,
        quantity : req.body.quantity
    }
    res.status(201).json({
        message:"orders was created",
        order: order,
    });
});

router.get('/:orderId',(req,res,next) => {
     res.status(200).json({
         message:'orders details',
         orderId: req.params.orderId
     });       
});

router.delete('/:orderId',(req,res,next) =>{
    res.status(200).json({
        message:"orders deleted",
        orderId: req.params.orderId
    });
});

module.exports = router;