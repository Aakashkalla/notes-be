import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from '../env.js';

export function authMiddleware(req : Request, res : Response, next : NextFunction){
    const token = req.cookies.token;
    if(!token){
        res.status(401).json({
            message : "Access Denied! No token"
        });
        return;
    }
    try{ 
        const decoded = jwt.verify(token, env.JWT_SECRET) as {id : string} 
        req.userId = decoded.id;
        next();
    }catch(e){
        res.status(401).json({
            message : "Invalid or expired token!"
        });
        return;
    }
    
}