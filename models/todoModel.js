const mongoose=require('mongoose')
const {Schema,model}=mongoose
const todoSCHEMA= new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    todo:{
        type:String,
        require:true
    }

})
const Todo=model("Todo",todoSCHEMA)
module.exports=Todo