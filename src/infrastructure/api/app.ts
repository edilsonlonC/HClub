import express, { Application, Router } from 'express';
import { initRouter } from './router/router';
let app: Application;

const addMiddlewares = () => {
  app.use(express.json());
};
export const initApp = async () => {
  app = express();
  const router: Router = await initRouter();
  addMiddlewares();
  app.use(router);
  return app;
};
