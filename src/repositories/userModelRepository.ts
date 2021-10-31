import mongoose from "mongoose";
import { inject, injectable } from 'inversify';
import { UserModel } from '../models/userModel';
import { BaseRepository } from './baseRepository';
import { UserModelRepositoryContract } from './contracts/baseRepositoryContract';
import { TYPES } from '../common/constants/types';

@injectable()
export class UserModelRepository extends BaseRepository<UserModel> implements UserModelRepositoryContract {
    public constructor(@inject(TYPES.UserModelSchemaName) userModelSchema: mongoose.Model<UserModel>) {
        super(userModelSchema);
    }
}