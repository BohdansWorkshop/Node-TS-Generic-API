import mongoose, { Schema, Document } from "mongoose";

export interface PostModel extends Document {
    authorEmail: string;
    dateCreated: Date;
    header: string;
    description: string;
    category: string;
    tags: string;
    viewsCount: number;
    location: string;
    images: Buffer;
}

const locationSchema: Schema = new Schema({
    country: String,
    region: String,
    city: String,
    district: String
});

const postModelSchema: Schema = new Schema({
    authorEmail: {
        type: String,
        required: [true, "Author Email is required"],
        trim: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    header: {
        maxLength: 100,
        type: String,
        required: [true, "Post name is required"]
    },
    description: {
        type: String,
        maxLength: 5000,
        required: [true, "Post description is required"]
    },
    category: {
        type: String,
        required: [true, "Choose category"]
    },
    tags: [{
        type: String,
        maxLength: 10,
        required: false
    }],
    viewersCount: {
        type: Number,
        required: true
    },
    location: {
        type: locationSchema
    },
    images: [{
        data: Buffer,
        contentType: String
    }]
});

let postModel = mongoose.model<PostModel>("PostModel", postModelSchema, "postModels");
export default postModel;