const asyncHandler = require("express-async-handler")
const User = require('../models/userModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error('all fields are mandatory')
    }
    const usernameUsed = await User.findOne({username})
    const emailUsed = await User.findOne({email})
    if(emailUsed){
        res.status(400)
        throw new Error('email already in use')
    }
    if(usernameUsed){
        res.status(400)
        throw new Error('username taken')
    }
    //we recieve raw password here, so by using bcrypt we hash that
    const hashedPassword = await bcrypt.hash(password,10)
    //console.log('hashed password',hashedPassword)
    const user = User.create({
        username:username,
        email:email,
        password:hashedPassword,
    })
    if(user){
        res.status(201).json({
            "_id":user.id,
            "email":user.email
        })
    }else{
        res.status(400)
        throw new Error('user is not valid')

    }
    //console.log('user created successfully')
})

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"10m"}
    );
        res.status(200).json({accessToken})
    }else{
        res.status(404)
        throw new Error('user not valid')
    }
    res.json({message:'user login'})
})

const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user)
})

module.exports = {registerUser,loginUser,currentUser}