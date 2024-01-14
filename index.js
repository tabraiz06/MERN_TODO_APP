const express=require('express')
require('dotenv').config()
var cors = require('cors')
const mongoose=require('mongoose')
const app=express()
app.use(cors())
const path = require("path");
app.use(express.json())
const url=process.env.URL
const marioRoutes = require('./routers/marioRouter')
const authRoute= require('./routers/authRoute')
const todoRoute=require('./routers/todoRoute')

 const Port=process.env.PORT || 4000
mongoose.connect(url).then(console.log('connection successfull'))
app.use('/mario',marioRoutes)
app.use('/api/auth',authRoute)
app.use('/api/',todoRoute)

app.get("/", (req, res) => {
  app.use(express.static(path.resolve( __dirname, "frontend vite", "dist")));
   res.sendFile(path.resolve( __dirname, "frontend vite", "dist", "index.html"));
  });
  

app.listen(Port,()=>{
  console.log(`server is running at port ${Port}`)
})