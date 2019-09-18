const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(3000, () => console.log('SV ativo na porta 3000'));