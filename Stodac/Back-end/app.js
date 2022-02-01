const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const factureRoutes = require('./routes/facture');


mongoose.connect(
    "mongodb+srv://stodacuser:h5zHJuAt4Tf1pWUl@cluster0.loqnp.mongodb.net/stodac?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log('connection à mongoDB réussie'))
    .catch(() => console.log('connection à mongoDB échouée'));

const app = express()


//Header CORS MiddleWare

app.use((req, res, next)=>{
    res.setHeader('Acces-Control-Allow-Origin', '*');
    res.setHeader('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Autorization');
    res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); 
})
app.use(cors())
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/user', userRoutes);
app.use('/api/facture', factureRoutes);

module.exports = app;