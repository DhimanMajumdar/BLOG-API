
// create our first http server
// import { createServer } from "http";

// const server=createServer((req,res)=>{
//     // set headers so browsers can read our response
//     res.setHeader("Content-type","application/json");

//     // handle the request
//     if(req.url=='/'){
//         res.writeHead(200);
//         res.end(JSON.stringify({message:"Hello World"}))
//     }
// })

// server.listen(3000,()=>{
//     console.log("Server is running on port 3000")
// })

import express from "express";
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express"

import authRoutes from "./routes/authRoutes.ts";
import { connectDB } from "./config/database.ts";
import { swaggerSpec } from "./config/swagger.ts";


dotenv.config();

const app=express();

const port=3000;

// app.get('/',(req,res)=>{
//     res.status(200).json({message:"Hello Duniyaa"})
// })

app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use("/api/auth",authRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port:${port} at http://localhost:${port}`)
})

connectDB().catch((err)=>{
    console.log(err)
});
