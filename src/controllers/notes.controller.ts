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

export async function getNotes(req:Request, res:Response){
    const userId = req.userId
    if(!userId){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }
    try{
        const notes = await NoteModel.find({userId})
        res.status(200).json({
            notes
        })
    }catch(e){
        res.status(500).json({
            message : 'Server Error!'
        });
        console.log(e)
    }
}

export async function updateNote(req:Request, res : Response){
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
    const noteId = req.params.noteId
    if(!userId){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }

    try{
        const updatedNote = await NoteModel.findOneAndUpdate({
            _id: noteId, userId
        },
        {
            title,
            content
        },
        {new : true}
        )
        if(updatedNote){
            res.status(200).json({
                message: "Updated Note",
                updatedNote
            })
        }else{
            res.status(404).json({
                message : "Note Not Found"
            })
        }
    }catch(e){
        res.status(500).json({
            message : "Server Error!"
        });
        console.log(e)
    }
    
}

export async function deleteNote(req : Request, res : Response){
    const userId = req.userId;
    if(!userId){
        return res.status(401).json({
            message : "Unauthorized"
        });
    }
    const noteId = req.params.noteId;

    try{
        const deletedNote = await NoteModel.findOneAndDelete({
            _id : noteId, userId
        });

        if(!deletedNote){
            return res.status(404).json({
                message : "Note not Found"
            })
        }else{
            return res.status(200).json({
                message : "Note Deleted"
            })
        }
        
    }catch(e){
        res.status(500).json({
            message : "Server Error!"
        });
        console.log(e);
    }
}