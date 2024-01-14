const {Schema,model}=require('mongoose')

const AuthSchema= new Schema({
    name:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true

    },
})
const User= model("User",AuthSchema)
module.exports=User