const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()

const User=require('../database/models/User.model')

router.post('/register',async(req,res)=>{
    try{
        const {name,email,password}=req.body

        // check if the email already exists
        const duplicateEmail=await User.findOne({
            email:email
        })

        if(duplicateEmail){
            return res.status(201).json({
                ok:false,
                error:'Email is already in use.'
            })
        }

        // hash the password
        const hashedPassword=await bcrypt.hash(password,10)

        // save the user
        const user=new User({
            name:name,
            email:email,
            password:hashedPassword
        })

        const saved=await user.save()
        if(saved){
            return res.json({
                user:saved._id,
                ok:true
            })
        }
    }
    catch(err){
        return res.json({
            ok:false,
            err
        })
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body

        // check if the user exists
        const existingUser=await User.findOne({
            email:email
        })

        if(!existingUser){
            return res.status(401).json({
                ok:false,
                error:'Email or Password is incorrect.'
            })
        }

        // check the password
        const correctPassword=await bcrypt.compare(password,existingUser.password)
        if(!correctPassword){
            return res.status(401).json({
                ok:false,
                error:'Email or Password is incorrect.'
            })
        }

        // jwt token
        const accessToken=jwt.sign({_id:existingUser._id},process.env.JWT_ACCESS_TOKEN,{expiresIn:'20s'})
        const refreshToken=jwt.sign({_id:existingUser._id},process.env.JWT_REFRESH_TOKEN,{expiresIn:'7d'})

        return res.status(201).json({
            accessToken,
            refreshToken,
            ok:true,
            user:existingUser._id,
            message:'Successfully Logged in.'
        })

    }
    catch(err){

    }
})

router.get('/protected',auth,async(req,res)=>{
    try{
        res.json({
            message:"Inside the protected route right now."
        })
    }
    catch(err){
        res.json({
            message:"Access Denied."
        })
    }
})

async function auth(req,res,next){
    var {token}=req.headers 
    token=token.split(' ')[1] //access token

    user=await jwt.verify(token,process.env.JWT_ACCESS_TOKEN)
    if(user){
        res.user=user
        next()
    }
    else{
        return res.status(403).json({
            message:"User not authorized."
        })
    }
    
}

router.post('renewAccessToken',async(req,res)=>{
     
    try{
        const {refreshToken} = req.body
        if(!refreshToken){
            return res.status(403).json({
                message:'no refresh token'
            })
        }

        const user=await jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN)
        if(!user){
            return res.status(403).json({
                message:'no refresh token'
            })
        }

        const accessToken=await jwt.sign({_id:user._id},process.env.JWT_ACCESS_TOKEN,{expiresIn:'20s'})
        return res.status(201).json({
            token:accessToken
        })
    }
    catch(err){

    }
        
})


module.exports=router