import { injectable } from 'inversify';
import { BaseRepositoryContract } from './contracts/baseRepositoryContract';
import mongoose, { Document } from "mongoose";
require('../models/postModel');
require('../models/userModel');

@injectable()
export class BaseRepository<T extends Document> implements BaseRepositoryContract<T> {
    modelSchema: mongoose.Model<T>;
    public constructor(modelSchema: mongoose.Model<T>) {
        this.modelSchema = modelSchema;
    }

    public async getAll(): Promise<T[]> {
        return this.modelSchema.find({ }, function (err: any, result: T[]) {
            if (err) {
                throw err;
            } else {
                return result;
            }
        });
    }

    public async getById(id: string): Promise<T> {
        return this.modelSchema.findById(new mongoose.mongo.ObjectId(id), function (err: any, result: any) {
            if (err) {
                throw err;
            } else {
                return result;
            }
        }).lean();
    }

    public async deleteById(id: string): Promise<boolean> {
        return this.modelSchema.findByIdAndDelete(new mongoose.mongo.ObjectId(id)).exec()
            .then(function (result: any) {
                if (result) {
                    return true;
                }
                return false;
            }).catch((err) => { throw err; });
    }

    public async create(inputData: T): Promise<T> {
        return this.modelSchema.create(inputData);
    }

    public async update(query: any, inputData: any): Promise<T> {
        return this.modelSchema.findOneAndUpdate(query, inputData)
            .setOptions({ new: true, overwrite: true })
            .lean();
    }

    public async findByQuery(query: any): Promise<T[]> {
        return this.modelSchema.aggregate(query);
    }
}