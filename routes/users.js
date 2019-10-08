
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require('../models/Users')
const modelUsers = mongoose.model("users")


const passport = require('passport')



router.get('/',(req,res)=>{
    res.render('./usuarios/criarconta')
})

module.exports = router