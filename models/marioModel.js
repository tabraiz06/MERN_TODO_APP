const {Schema,model}=require('mongoose')

const marioModel=new Schema({
    name:{type:String},
    weight:{type: Number}

})
const Mario=model("Mario",marioModel)
module.exports=Mario