const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

mongoose.connect(process.env.DB_CREDENTIALS,
    {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology: true
    },()=>{
        console.log('Connected to database');
    }
)
