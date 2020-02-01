import { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import get from 'lodash/get';
import errors, { ResponseError } from '../lib/errors';
import routes from '../api';
import logger from '../lib/logger';

export default (app: Express) => {
  // Healthcheck endpoint
  app.get('/status', (_, res) => {
    res.status(200).send();
  });

  app.head('/status', (_, res) => {
    res.status(200).send();
  });

  app.enable('trust proxy');
  app.use(helmet());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(bodyParser.json());

  // Routes
  app.use('/', routes());

  // Not found handler
  app.use('*', (_, __, next) => {
    next(errors[404]('Page not found'));
  });

  // Default error handler
  app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => { // tslint:disable-line
    logger.error(err);

    const e = (err.type === 'ResponseError')
      ? err
      : errors[500](err.message);

    const status = get(e, 'status');
    const message = get(e, 'message');
    const code = get(e, 'code');

    res
      .status(status)
      .json({
        errors: [{
          code,
          message,
          status,
        }],
      });
    });

  return app;
};
