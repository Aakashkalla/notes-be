import { z } from 'zod';
import bcrypt from "bcrypt";
import { UserModel } from '../models/userModel.js';
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from '../env.js';

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

export async function loginUser(req: Request, res: Response){
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
    try{
        const {email, password} = parsedBody.data;
        const trimmedEmail = email.trim().toLowerCase()
        const existingUser = await UserModel.findOne({
            email : trimmedEmail
        })
        if(!existingUser){
            res.status(401).json({
                message: "Invalid Username/Password"
            });
            return;
        }  
        
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if(!passwordMatch){
            res.status(401).json({
            message:"Invalid Username/Password"
            });
            return;
        }else{
            const token = jwt.sign(
                { id: existingUser._id },
                env.JWT_SECRET,
                { expiresIn: "2h" }
            );

            res.cookie("token", token, {
            httpOnly: true,
            secure: false,        // true in production
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
            });

            res.status(200).json({
            message: "User Login Successful"
            });
        }
        }catch(e){
        res.status(500).json({
            message : "Server Error!"
        })
        console.log(e)
    }
    
}

export async function getCurrentUser(req:Request, res:Response){
    try{
        const userId = req.userId;
        if(!userId){
            return res.status(401).json({
                message : "Unauthorized"
            });
            
        }

        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(401).json({
                message : "User not Found"
            });
        }

        res.status(200).json({
            _id : user._id,
            email : user.email
        });

    }catch(e){
        res.status(500).json({
            message : "Server Error!"
        });
        console.log(e)
    }
}