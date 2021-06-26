//importamos enl dotenv
require ("dotenv").config()

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//importamos mongoose 
const mongoose = require("mongoose");
const cors = require("cors");

//conexión de mongoose
mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then((x)=>{
    console.log(`Connect to Mongo! Database name: "${x.connections[0].name}"`)
}).catch((err)=>{
    console.log("Error connecting to mongo", err)
})

const app = express();

//utilizamos cors para inicializar otras apps
app.use(cors({
    origirn:["http:localhost:300",],
    credentials:true}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//estas son las rutas, pro practica le agreamos el prefix api
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);

//una nueva ruta que tome por defecto cuando refresquemos

module.exports = app;
