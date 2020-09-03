const mongoose=require('mongoose')
const Schema=mongoose.Schema

module.exports=mongoose.model('User',Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
}))