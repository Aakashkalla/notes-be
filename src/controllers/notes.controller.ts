import type { Request, Response } from "express";
import { NoteModel } from "../models/noteModel.js";
import { z } from 'zod';
import mongoose from "mongoose";

export async function createNote(req:Request, res:Response) {
    const requiredBody = z.object({
        title : z.string().nonempty(),
        content : z.string().nonempty()
    })
    
    const parsedBody = requiredBody.safeParse(req.body);

    if(!parsedBody.success){
        res.status(400).json({
            message : "Invalid Input",
            errors : parsedBody.error.issues
        });
        return;
    }

    const {title, content} = parsedBody.data;
    const userId = req.userId;

    if(!userId){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    try{
        const note = await NoteModel.create({
            title,
            content,
            userId : userObjectId
        })

        res.status(201).json({
            message : "Note Created",
            note
        })

    }catch(e){
        res.status(500).json({
            message : "Server Error!"
        });
        console.log(e);
    }
}