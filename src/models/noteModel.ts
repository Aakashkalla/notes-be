import mongoose, { Schema } from "mongoose";

interface Note{
    title : string
    content : string
    userId : Schema.Types.ObjectId

}

const noteSchema = new Schema<Note>({
    title : {
        required: true,
        type : String
    },
    content : {
        required : true,
        type : String
    },
    userId : {
        required: true,
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps : true
})

export const NoteModel = mongoose.model('Note', noteSchema)