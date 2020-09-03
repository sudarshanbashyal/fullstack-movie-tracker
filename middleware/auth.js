const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const auth=(req,res,next)=>{
    try{
        const token=req.header('auth-token');

        if(!token){
            return res.status(401).json({
                ok:false,
                error:'No authentication token; authorization denied.'
            })
        }

        const verified=jwt.verify(token,process.env.JWT_ACCESS_TOKEN);
        if(!verified){
            return res.status(401).json({
                ok:false,
                error:'False token; authorization denied.'
            })
        }

        req.user=verified.id;
        next();
    }
    catch(err){
        return res.json({
            ok:false,
            err
        })
    }
}

module.exports=auth