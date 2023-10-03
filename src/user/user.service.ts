import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOne(username: string) : Promise<User | undefined> {
        return this.userModel.findOne({username: username});
    }

}
