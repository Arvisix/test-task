import { StatusCodes } from 'http-status-codes';

import Error from './Error';

/**
 * @class NotFoundError
 * @extends {Error}
 */
class NotFoundError extends Error {
  /**
   * Error message to be thrown.
   *
   * @type {string}
   * @memberof UnauthorizedError
   */
  message: string;

  /**
   * Creates an instance of NotFoundError.
   *
   * @param {string} message
   * @memberof NotFoundError
   */
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);

    this.message = message;
  }
}

export default NotFoundError;
