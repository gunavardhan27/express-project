//const { truncateSync } = require('fs')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required : [true,'please enter username'],
        unique : [true,'username already taken']
    },
    email:{
        type:String,
        required : [true,'please enter email'],
        unique : [true,'email already taken'],
    },
    password:{
        type:String,
        required : [true,'please enter password'],
    }
    
},
{
    timestamp:true
})


module.exports = mongoose.model('user',userSchema)