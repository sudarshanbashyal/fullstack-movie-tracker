const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();


// middlewares
app.use(express.json());
app.use(cors());

// database and routes
require('./database/db');
const movieRoute=require('./routes/Movie.route');
const authenticationRoute=require('./routes/Authentication.route');

app.use('/movie',movieRoute);
app.use('/user',authenticationRoute);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index'));
    })
}

// graphql
const schema=require('./schema');

const {graphqlHTTP}=require('express-graphql');

app.use('/graphql',graphqlHTTP({
    schema,

    // graphical tool 
    graphiql:true
}))

const PORT=process.env.PORT || 4000;

app.listen(PORT);