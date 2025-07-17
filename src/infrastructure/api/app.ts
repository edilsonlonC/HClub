import express, { Application, Router } from 'express';
import { initRouter } from './router/router';
import { handlerError } from './middlewares/error.middleware';
let app: Application;

const addMiddlewares = () => {
  app.use(express.json());
};
export const initApp = async () => {
  app = express();
  const router: Router = await initRouter();
  addMiddlewares();
  app.use(router);
  app.use(handlerError);
  return app;
};
