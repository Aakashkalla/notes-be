import express  from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/notes.controller.js";

export const noteRouter = express.Router();

noteRouter.post("/", authMiddleware, createNote);
noteRouter.get("/", authMiddleware, getNotes);
noteRouter.put("/:noteId", authMiddleware, updateNote);
noteRouter.delete("/:noteId", authMiddleware, deleteNote);