import { BaseController } from './baseController';
import { inject } from 'inversify';
import { controller } from 'inversify-express-utils';
import 'reflect-metadata';
import { UserModelRepository } from '../repositories/userModelRepository';
import { TYPES } from '../common/constants/types';

@controller('/api/user')
export class UserController extends BaseController {
    constructor(@inject(TYPES.UserModelRepository) private userModelRepository: UserModelRepository) {
        super(userModelRepository);
    }
}