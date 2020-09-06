const express=require('express');
const router=express.Router();
const User=require('../database/models/User.model');

router.post('/addMovie',async(req,res)=>{
    try{
        console.log(req.body)
        const {userId,movieId,runtime,movieTitle,moviePoster,movieRating}=req.body;

        const movie={
            id:movieId,
            title:movieTitle,
            runtime:runtime,
            moviePoster:moviePoster,
            movieRating:movieRating,
            dateAdded:Date.now()
        }

        const updatedList=await User.findOneAndUpdate(
            {_id:userId},
            {
                $push:{movieList:movie},
            },
            {new:true}
        );

        return res.status(201).json({
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

router.post('/removeMovie',async(req,res)=>{
    try{
        
        const {movieId,userId}=req.body;

        const updatedList=await User.findOneAndUpdate(
            {_id:userId},
            {
                $pull:{'movieList':{'id':movieId}}
            },
            {new:true}
        );

        return res.status(201).json({
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

module.exports=router