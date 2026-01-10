import { z } from 'zod';
import bcrypt from "bcrypt";
import { UserModel } from '../models/userModel.js';
import type { Request, Response } from "express";

export async function registerUser(req : Request, res : Response){
    const requiredBody = z.object({
        email : z.email().trim(),
        password : z.string().min(6).max(20)
    })

    const parsedBody = requiredBody.safeParse(req.body)

    if(!parsedBody.success){
        res.status(400).json({
            message : "Invalid Format!",
            error : parsedBody.error.issues
        });
        return;
    }

    const {email, password} = parsedBody.data;
    const trimmedEmail = email.trim().toLowerCase()
    const existingUser = await UserModel.findOne({
        email : trimmedEmail
    })

    if(existingUser){
        res.status(409).json({
            message : "User Already Exists! Please login"
        })
    }else{
        try{
        const hashedPassword = await bcrypt.hash(password, 8)
        

        await UserModel.create({
            email : trimmedEmail,
            password : hashedPassword
        });

        res.status(201).json({
            message : "You have Successfully Signed Up"
        })

        }catch(e){
            res.status(500).json({
            message : "Server Error!"
            })
        console.log(e)
        }
    }
    

    

}