import { Express } from 'express';
import authLoader from './authLoader';
import expressLoader from './expressLoader';
import injectDependency from './dependencyInjector';
import logger from '../lib/logger';

export default (app: Express) => {
  injectDependency();
  logger.info('Dependency injected');

  authLoader(app);
  logger.info('Authentication loaded');

  expressLoader(app);
  logger.info('Express loaded');

  return app;
};
