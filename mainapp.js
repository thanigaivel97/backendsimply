const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const au = require('./routes/auth')

const app = express();

app.use(bodyparser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', au);

mongoose.connect('mongodb+srv://hello:hello@cluster0-acgtj.mongodb.net/hello?retryWrites=true&w=majority').then(rs => {
    app.listen(8080);
}).catch(err => {

});