import mongoose, { Schema, Document } from "mongoose";

export interface UserModel extends Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    registered: Date;
    visited: Date;
    createdPostsIds: string[];
    favoritePostsIds: string[];
    userType: string;
    profileImage: Buffer;
    tokens: string[];
}

const userModelSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Wrong user email']
    },
    phone: {
        type: String,
        // validate: {
        //     validator: function(v) {
        //         return /\d{3}-\d{3}-\d{4}/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        // },
        required: [true, 'User phone number required']
    },
    password: {
        type: String,
        minLength: 5,
        required: [true, 'Password is required']
    },
    registered: {
        type: Date,
        default: Date.now
    },
    visited: {
        type: Date,
        default: Date.now
    },
    createdPostsIds: [{
        type: String
    }],
    favoritePostsIds: [{
        type: String
    }],
    userType: {
        type: String,
        enum: ['Common', 'Editor', 'Admin'],
        required: [true, "User Type is required"],
        default: 'Common'
    },
    profileImage: {
        data: Buffer,
        contentType: String
    },
    tokens: [{
        token: {
            type: String
        }
    }]
});

let userModel = mongoose.model<UserModel>("UserModel", userModelSchema, "userModels");
export default userModel;