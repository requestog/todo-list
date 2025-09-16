import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

@Schema({ timestamps: true })
export class Session extends Document {
    declare _id: mongoose.Types.ObjectId;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    })
    userId: MongooseSchema.Types.ObjectId;

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
    })
    refreshToken: string;

    @Prop({ required: true })
    expiresAt: Date;

    @Prop({
        type: String,
        trim: true,
    })
    ipAddress?: string;

    @Prop({
        type: String,
        trim: true,
    })
    userAgent?: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
