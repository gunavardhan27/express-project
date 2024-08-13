const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const validateToken = asyncHandler(async (req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    //console.log(authHeader)
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]
        //the auth header has bearer space and the access token assigned to that user when he logs in
        //the above code is to access the acces token from the req header and then verify it using jwt
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401)
                throw new Error('not valid')
            }
            req.user = token.user 
            next()
            //the above line i didnt understand y
        })
        if(!token){
            res.status(401)
            throw new Error('token missing or user not authorized')
        }
    }
    else{
        console.log('shit bro')
    }
})

module.exports = validateToken