import { httpServer } from './infrastructure/api/server';

const main = async () => {
  await httpServer();
};

main();
