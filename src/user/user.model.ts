import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {

    _id: string;

    @Prop({required: true, type: String})
    username: string;

    @Prop({type: {required: true, type: String}})
    password: string;
    
}

export const UserSchema = SchemaFactory.createForClass(User);