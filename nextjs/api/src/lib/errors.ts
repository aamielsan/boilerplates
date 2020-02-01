import { STATUS_CODES } from 'http';

export class ResponseError extends Error {
  public title: string;
  public status: number;
  public code?: string;
  public type: string;

  constructor({
    title,
    message,
    code,
    status,
  }: {
    title: string;
    message: string;
    status: number;
    code?: string;
  }) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.code = code;
    this.status = status;
    this.title = title;
    this.type = 'ResponseError';
  }
}

// Error definitions using Node's built-in status codes
type MakeError = (errorMessage?: string, errorCode?: string) => ResponseError;

const collection: Record<string|number, MakeError> = {};
const codes = Object.getOwnPropertyNames(STATUS_CODES);
const spaceRegex = new RegExp('\\s', 'g');

// Define errors
for (const code of codes) {
  const mCode = Number(code);
  const mMsg = STATUS_CODES[code];
  const mType = mMsg!.replace(spaceRegex, '');
  const mKey = mType.indexOf('Error') > -1
    ? mType
    : mType + 'Error';

  collection[mKey] = collection[mCode] =
    (errorMessage, errorCode) => new ResponseError({
      title: mKey,
      status: mCode,
      message: errorMessage || mMsg || '',
      code: errorCode || '',
    });
}

export default collection;
