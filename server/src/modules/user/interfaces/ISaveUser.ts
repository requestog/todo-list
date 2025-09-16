import mongoose from 'mongoose';

export interface ISaveUser {
    _id: mongoose.Types.ObjectId;
    username: string;
}
