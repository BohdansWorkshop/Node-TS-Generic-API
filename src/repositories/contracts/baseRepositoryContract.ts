import { Document, UpdateQuery } from 'mongoose';
import { PostModel } from '../../models/postModel';
import { UserModel } from '../../models/userModel';

export interface BaseRepositoryContract<T extends Document> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T>;
    deleteById(id: string): Promise<boolean>;
    update(query: any, inputData: UpdateQuery<T>): Promise<T>;
    findByQuery(query: any): Promise<T[]>;
    create(inputData: T): Promise<T>;
}

export type UserModelRepositoryContract = BaseRepositoryContract<UserModel>;
export type PostModelRepositoryContract = BaseRepositoryContract<PostModel>;