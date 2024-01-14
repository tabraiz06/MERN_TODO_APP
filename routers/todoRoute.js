const express=require('express')
const Todo=require('../models/todoModel')
const router= express.Router()
const jwt = require('jsonwebtoken');
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

router.post('/addtodo',verifyToken,async(req,res)=>{
    console.log(req.user)
try {
    const {todo}=req.body
    const newtodo=await Todo.create({todo,userId:req.user})
    res.status(200).json(newtodo)
} catch (error) {
   res.status(400).json({message:"error in todo creation"}) 
}
})

router.put('/updatetodo/:id',verifyToken,async(req,res)=>{
    try {
        const updatetodo=await Todo.findByIdAndUpdate({_id:req.params.id},{todo:req.body.todo})
        res.status(200).json({message:'updated successfully' ,updatetodo})
    } catch (error) {
        res.status(400).json({message:'error in updating'})
    }
})
router.delete('/deletetodo/:id',verifyToken,async(req,res)=>{
    try {
       const deleteTodo=await Todo.findByIdAndDelete({_id:req.params.id}) 
       res.status(200).json({message:"deleted successfull"})
    } catch (error) {
        res.status(400).json({message:"error in delete route"})
        
    }
})
router.get('/fetchtodos',verifyToken,async(req,res)=>{
   try {
    const todos= await Todo.find({userId:req.user})
    res.status(200).json(todos)
   } catch (error) {
    res.status(400).json(error)
   }


})

// router.delete('/deleteall',verifyToken,async(req,res)=>{
//     try {
//         console.log(req.user)
//         const deleteall=await Todo.find({userId:req.user})
//         res.status(200).json({message:'success'})
//     } catch (error) {
//         res.status(400).json({error:"error from deleteall route"})
//     }

// })
module.exports=router



