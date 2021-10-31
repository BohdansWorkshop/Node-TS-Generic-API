import { Request, Response } from 'express';
import { BaseController } from './baseController';
import { inject } from 'inversify';
import { controller } from 'inversify-express-utils';
import 'reflect-metadata';
import { PostModelRepository } from '../repositories/postModelRepository';
import { TYPES } from '../common/constants/types';
import { UserModelRepository } from '../repositories/userModelRepository';

@controller('/api/post')
export class PostController extends BaseController {
  constructor(@inject(TYPES.PostModelRepository) private postModelRepository: PostModelRepository,
    @inject(TYPES.UserModelRepository) private userModelRepository: UserModelRepository) {
    super(postModelRepository);
  }

  async createNew(req: Request, res: Response) {
    try {
      let post = await this.postModelRepository.create(req.body);
      await this.userModelRepository.update({ email: post.authorEmail }, { "$addToSet": { createdPostsIds: post._id } });
      res.status(200).send(post);
    }
    catch (error) {
      res.status(500).send(error);
    }
  }
}