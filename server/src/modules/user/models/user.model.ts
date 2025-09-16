import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    declare _id: mongoose.Types.ObjectId;

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
    })
    username: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, default: undefined })
    confirmationToken?: string;

    @Prop({ type: Date, default: undefined })
    confirmationExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
