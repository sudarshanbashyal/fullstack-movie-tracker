const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const auth=require('../middleware/auth');

const User=require('../database/models/User.model');

router.post('/register',async(req,res)=>{
    try{
        const {name,email,password,confirmPassword}=req.body;

        // check all credentials
        if(!name||!email||!password||!confirmPassword){
            return res.status(400).json({
                ok:false,
                error:'Please enter all the credentials.'
            })
        }

        if(password!==confirmPassword){
            return res.status(400).json({
                ok:false,
                error:'Pleae enter the same password.'
            })
        }

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
        const hashedPassword=await bcrypt.hash(password,10);

        // save the user
        const user=new User({
            name:name,
            email:email.toLowerCase(),
            password:hashedPassword
        })

        const saved=await user.save();
        if(saved){
            return res.json({
                user:saved._id,
                ok:true,
                message:'Successfully registered.'
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

        const {email,password}=req.body;

        // check credentails
        if(!email||!password){
            return res.status(401).json({
                ok:false,
                error:'Please enter all the credentials.'
            })
        }
        
        const user=await User.findOne({email:email})
        if(!user){
            return res.status(401).json({
                ok:false,
                error:'Invalid email or password.'
            })
        }

        const correctPassword=await bcrypt.compare(password,user.password)
        if(!correctPassword){
            return res.status(401).json({
                ok:false,
                error:'Invalid email or password.'
            })
        }

        // sign jwt
        const token=jwt.sign({id:user._id},process.env.JWT_ACCESS_TOKEN);

        // return user
        return res.status(200).json({
            ok:true,
            message:'Successfully Logged in.',
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
            },
            token,
            list:user.movieList
        })

    }
    catch(err){
        return res.json({
            ok:false,
            err
        })
    }
})

// private routes
router.post('/addMovie',async(req,res)=>{
    try{
        console.log(req.body)
        const {listName,userId,movieId,runtime,movieTitle}=req.body;

        const movie={
            id:movieId,
            title:movieTitle,
            runtime:runtime,
            listName:listName,
            dateAdded:Date.now()
        }

        const updatedList=await User.findOneAndUpdate(
            {_id:userId},
            {$push:{movieList:movie}},
            {new:true}
        );

        return res.json({
            ok:true,
            updatedList
        })

    }
    catch(err){
        return res.json({
            ok:false,
            err
        })
    }
})

// validate token
router.post('/tokenIsValid',async(req,res)=>{
    try{

        const token=req.header('auth-token');
        if(!token) return res.json({ok:false});

        const verified=jwt.verify(token,process.env.JWT_ACCESS_TOKEN);
        if(!verified) return res.json({ok:false});

        const user=await User.findById(verified.id);
        if(!user) return res.json({ok:false});

        return res.json({
            token,
            ok:true,
            user:{
                id:user._id,
                name:user.name
            },
            list:user.movieList
        });

    }
    catch(err){
        return res.json({
            ok:false,
            err
        })
    }
})

module.exports=router