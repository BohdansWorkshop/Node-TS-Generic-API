import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { httpGet, httpPost, httpPut, httpDelete, httpPatch } from 'inversify-express-utils';
import 'reflect-metadata';
import { BaseRepository } from '../repositories/baseRepository';

@injectable()
export abstract class BaseController {
    repository: BaseRepository<any>;
    constructor(repository: BaseRepository<any>) {
        this.repository = repository;
    }

    @httpGet('/')
    public async getAll(req: Request, res: Response) {
        let result = await this.repository.getAll();
        res.status(200).send(result);
    }

    @httpGet('/:id')
    public async getById(req: Request, res: Response) {
        await this.repository.getById(req.params.id).then(function (result) {
            res.status(200).send(result);
        }).catch(function (error) {
            res.status(500).send(error);
        });
    }

    @httpPost('/filter')
    public async filter(req: Request, res: Response) {
        let limit = parseInt(req.body.limit);
        let skip = parseInt(req.body.page) * limit;
        let match = typeof req.body.match == 'undefined' ? {} : req.body.match;
        let sort = typeof req.body.sort == 'undefined' ? null : req.body.sort;

        let query = [];
        query.push({ $match: match });
        if (sort !== null && (Object.values(sort)[0] == 1 || Object.values(sort)[0] == -1)) {
            query.push({ $sort: sort });
        }

        if (skip > 0) {
            query.push({ $skip: skip });
        }

        if (limit > 0) {
            query.push({ $limit: limit });
        }

        await this.repository.findByQuery(query).then(function (result) {
            res.status(200).send(result);
        }).catch(function (error) {
            res.status(500).send(error);
        });
    }

    @httpPut('/create')
    public async createNew(req: Request, res: Response) {
        await this.repository.create(req.body).then(function (result) {
            res.status(200).send(result);
        }).catch(function (error) {
            res.status(500).send(error);
        })
    }

    @httpPatch('/update')
    public async update(req: Request, res: Response) {
        await this.repository.update({ _id: req.body.id }, req.body).then(function (result) {
            res.status(200).send(result);
        }).catch(function (error) {
            res.status(500).send(error);
        })
    }

    @httpDelete('/delete')
    public async delete(req: Request, res: Response) {
        await this.repository.deleteById(req.body._id).then(function (result) {
            res.status(200).send(result);
        }).catch(function (error) {
            res.status(500).send(error);
        })
    }
}
