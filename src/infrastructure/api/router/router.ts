import express, { Router } from 'express';

export const initRouter = (): Router => {
  const router: Router = express.Router();
  router.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });
  return router;
};
