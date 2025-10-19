
import type { Request,Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/Blog.ts";


// register a new user
export async function register(req:Request,res:Response){
    try {
        const {name,email,password}=req.body as {
            name:string;
            email:string;
            password:string;
        }

        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        const existing=await User.findOne({email});

        if(existing){
            return res.status(400).json({message:"Email already in use!!"})
        }

        const passwordHash=await bcrypt.hash(password,10);

        const user=await User.create({name,email,password:passwordHash});

        const token=jwt.sign({userId:String(user._id)}, process.env["JWT_SECRET"] as string,{
            expiresIn:"7d"
        })

        return res.status(201).json({token,user:{id:String(user._id),name,email}});

    } catch (error) {
        return res.status(500).json({message:"Internal server error"})   
    }
}

// login a user
export async function login(req:Request,res:Response) {
    try{
        const {email,password}=req.body as {email:string,password:string};
        if(!email||!password){
            return res.status(400).json({message:"All fields are required"})
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid Credentials"})
        }
        const ok=await bcrypt.compare(password,user.password);
        if(!ok){
            return res.status(401).json({message:"Invalid Credentials"})
        }
          const token=jwt.sign({userId:String(user._id)}, process.env["JWT_SECRET"] as string,{
            expiresIn:"7d"
        })
       return res.status(201).json({token,user:{id:String(user._id),name,email}});

    } catch(error){
        return res.status(500).json({message:"Internal server error"})  
    }
}

export default {register,login};
