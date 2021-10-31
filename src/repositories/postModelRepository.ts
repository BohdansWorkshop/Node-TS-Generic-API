import mongoose from "mongoose";
import { inject, injectable } from 'inversify';
import { PostModel } from '../models/postModel';
import { BaseRepository } from './baseRepository';
import { PostModelRepositoryContract } from './contracts/baseRepositoryContract';
import { TYPES } from '../common/constants/types';

@injectable()
export class PostModelRepository extends BaseRepository<PostModel> implements PostModelRepositoryContract {
    public constructor(@inject(TYPES.PostModelSchemaName) postModelSchema: mongoose.Model<PostModel>) {
        super(postModelSchema);
    }
}