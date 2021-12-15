const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config()

const orderRoutes = require('./api/routes/orders');
const productRoutes = require('./api/routes/products');

mongoose.connect(  
    process.env.DB_CONNECTION_STRING,
    {useUnifiedTopology: true, useNewUrlParser: true},
    (req,res) => {
        console.log("connected to database")
    }
                );

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Allow-control-Allow-Headers",
        "origin, X-Requested-With, Content-Type, Accept,Authorization"
    );

    if(req.method ==="OPTIONS"){
        res.header('Access-Control-Allow-Methods', "PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    };
    next();
})

//middleware routes which should handle request
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req, res, next) => {
    const error = new Error('not found');
    //error.status(404);
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});


module.exports = app;