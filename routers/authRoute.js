const express = require('express')
const User = require('../models/authModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const secrte_key = process.env.SECRET_KEY
const router = express.Router()
const JWT_SECRET=process.env.SECRET_KEY
const verifyToken=(req,res,next)=>{
   
    const token=req.header("AuthToken")
    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid token" })

    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user

        next()
    
} catch (error) {
    res.status(401).send({ error: "please authenticate using a valid token" })
}


}


router.get('/fetchuser',verifyToken,async(req,res)=>{
   try {

    const user=await User.find()
    res.status(200).json(user)
   } catch (error) {
    res.status(400).json({message:error.message})
   }
})

router.post('/register', async (req, res) => {
    try {
        const { name, username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email })
        if (userExist) {
            res.status(400).json({ message: "email already registered" })
        }

        const securePassword = bcrypt.hashSync(password, 10)
        const user = await User.create({ name, username, email, phone, password: securePassword })
        const data = {
            user: user.id
        }
       

        const AuthToken = jwt.sign(data, secrte_key)
        res.status(200).json({ message: "registration successfull ", AuthToken, user })
    } catch (error) {

    }
})

router.post('/login',async(req,res)=>{
    try {
        const{email,password}=req.body
        
        const user=await User.findOne({email})
        if(!user){
            res.status(400).json({message:'invalid credentials'})
        }
        const comparePassword=  await bcrypt.compare(password,user.password)
        if(!comparePassword){
            res.status(400).json({message:"please provide valid password"})
        }
        const data={
            user:user.id
        }
        const AtuhToken=jwt.sign(data,secrte_key) 
        res.status(200).json({message:"login successfull",AtuhToken,result:"success",user})

    } catch (error) {
        
    }
})
module.exports = router
