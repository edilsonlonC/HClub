import statusCodes, { getReasonPhrase } from 'http-status-codes';

export interface HttpError {
  message: string;
  statusCode: number;
  statusMessage: string;
}

export const badRequest = (message: string): HttpError => ({
  message,
  statusCode: statusCodes.BAD_REQUEST,
  statusMessage: getReasonPhrase(statusCodes.BAD_REQUEST),
});

export const notFound = (message: string): HttpError => ({
  message,
  statusCode: statusCodes.NOT_FOUND,
  statusMessage: getReasonPhrase(statusCodes.NOT_FOUND),
});

export const internalServerError = (message: string): HttpError => ({
  message,
  statusCode: statusCodes.INTERNAL_SERVER_ERROR,
  statusMessage: getReasonPhrase(statusCodes.INTERNAL_SERVER_ERROR),
});
