const express = require('express')
const morgan = require('morgan')
const mongoose = require("mongoose");
const config = require("./config/config");

const app = require('./config/express');

mongoose.connect(config.mongo.host, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if(err) return console.log(err);
    app.listen(config.port, function(){
        console.log(`Listening on http://localhost:${config.port}/`)
    });
});
