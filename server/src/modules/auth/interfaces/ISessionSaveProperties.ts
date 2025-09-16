import { Types } from 'mongoose';

export interface ISessionSaveProperties {
    id?: Types.ObjectId;
    userId: Types.ObjectId;
    refreshToken: string;
    ipAddress?: string;
    userAgent?: string;
}
