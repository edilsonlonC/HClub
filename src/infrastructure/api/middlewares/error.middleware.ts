import { NextFunction, Request, Response } from 'express';
import { badRequest, HttpError, internalServerError, notFound } from '../errors';
import { NotFoundEntityError } from '../../../domain/errors/not.found.entity.error';
import { createLogger } from '../../logger';
import { Logger } from 'pino';
import { EntityAlreadyExistError } from '../../../domain/errors/entity.already.exist.error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handlerError = (error: HttpError | Error, _: Request, res: Response, __: NextFunction) => {
  const logger: Logger = createLogger();
  logger.error(error);
  console.log(error);

  if (error instanceof NotFoundEntityError) {
    return res.status(404).json(notFound(error.message));
  }
  if (error instanceof EntityAlreadyExistError) {
    return res.status(400).json(badRequest(error.message));
  }
  if (error instanceof Error) {
    return res.status(500).json(internalServerError('Internal server error'));
  }
  return res.status(error.statusCode).json({
    message: error.message,
    statusCode: error.statusCode,
    statusMessage: error.statusMessage,
  });
};
