const express=require('express');
const app=express();
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
app.use(movieRoute);
app.use(authenticationRoute);


// graphql
const schema=require('./schema');

const {graphqlHTTP}=require('express-graphql');

app.use('/graphql',graphqlHTTP({
    schema,

    // graphical tool 
    graphiql:true
}))

app.listen(4000,()=>{
    console.log("Server up...");
})