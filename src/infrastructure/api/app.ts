import express, { Application, Router } from 'express';
import { initRouter } from './router/router';
let app: Application;

const addMiddlewares = () => {
  app.use(express.json());
};
export const initApp = () => {
  app = express();
  const router: Router = initRouter();
  app.use(router);
  addMiddlewares();
  return app;
};
