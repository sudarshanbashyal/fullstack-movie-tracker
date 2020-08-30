const express=require('express')
const app=express()
const cors=require('cors')

app.use(express.json())
app.use(cors())


const schema=require('./schema')

const dotenv=require('dotenv')
dotenv.config();

const {graphqlHTTP}=require('express-graphql')

app.use('/graphql',graphqlHTTP({
    schema,

    // graphical tool 
    graphiql:true
}))

app.listen(4000,()=>{
    console.log("Server up...")
})