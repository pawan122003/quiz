const express= require('express')
const router = express.Router()
require('dotenv').config()
const { body , validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_Secret="iamadmin@goodalways##$"
const adminEmail="admin123@gmail.com"
const adminPassword="Admin@123"


// create a api for login admin 
router.post('/adminlogin',[
    body("email",'Please enter valid Email address').isEmail(),
    body("password","Password cannot be blank").exists()
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let success = false
    const {email, password} = req.body;
    
    try {  
    if(email === adminEmail && password === adminPassword){
        const data = {
            user:{
                id: 1
            }
        }
        const authToken = jwt.sign(data,JWT_Secret)
        success = true
        res.send({success,authToken})
        // res.send('access granted')
    }else{
        return res.status(400).json({success, error: "Please try to login with correct credentials"})
        // return res.send({mail:adminEmail})
    }
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Interal server error occured")
    }

})

module.exports = router