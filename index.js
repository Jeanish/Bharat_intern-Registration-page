import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { Registration } from "./models/user.model.js";

const app=express()
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path:'./.env'
})

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/pages/index.html")
})


app.post("/register",async (req,res)=>{
    try{
        const { name,email,password } = req.body;
        console.log(name)
        const existedUer=await Registration.findOne({email:email})
        if(!existedUer){
            const registrationData = new Registration({
                name,
                email,
                password
            })
            await registrationData.save();
            res.redirect('/success')
        }
        
    }
    catch(error){
        console.log(error);
        res.redirect('/error')
    }
})

app.get("/success",(req,res)=>{
    res.sendFile(__dirname+"/pages/success.html")
})
app.get("/error",(req,res)=>{
    res.sendFile(__dirname+"/pages/error.html")
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running on localhost:${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("mongodb connection error",error);
})