import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';

@Schema({ timestamps: true })
export class Todo extends Document {
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
    })
    title: string;

    @Prop({
        type: Boolean,
        required: true,
        default: false,
    })
    completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
