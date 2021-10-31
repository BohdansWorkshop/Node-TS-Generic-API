import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import mongoose from 'mongoose';
import mongooseConnect from './mongooseConnect';
import userModel, { UserModel } from './models/userModel';
import postModel, { PostModel } from './models/postModel';
import { UserController } from './controllers/userController';
import { PostController } from './controllers/postController';
import { BaseController } from './controllers/baseController';
import { UserModelRepository } from './repositories/userModelRepository';
import { PostModelRepository } from './repositories/postModelRepository';
import { UserModelRepositoryContract, PostModelRepositoryContract } from './repositories/contracts/baseRepositoryContract';
import { TYPES } from './common/constants/types';
import express from 'express';

const PORT = process.env.PORT || 3000;
let container = new Container();

BindDependencies();

let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(express.json());
  app.get('/', (req, res) => res.send('Express + TypeScript Server'));
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Token, Content-Type, Accept");
    next();
  });
})
mongooseConnect("TEMP");

let app = server.build();
app.listen(PORT, () => {
  console.log(`S ⚡️[server]: Server is running at https://localhost:${PORT}`);
});

function BindDependencies() {
  container.bind<BaseController>(TYPES.Controller).to(PostController);
  container.bind<BaseController>(TYPES.Controller).to(UserController);

  container.bind<PostModelRepositoryContract>(TYPES.PostModelRepository).to(PostModelRepository);
  container.bind<UserModelRepositoryContract>(TYPES.UserModelRepository).to(UserModelRepository);

  container.bind<mongoose.Model<UserModel>>(TYPES.UserModelSchemaName).toConstantValue(userModel);
  container.bind<mongoose.Model<PostModel>>(TYPES.PostModelSchemaName).toConstantValue(postModel);
}
