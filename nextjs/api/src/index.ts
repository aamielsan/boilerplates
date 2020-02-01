import 'reflect-metadata';
import './lib/env';

import express from 'express';
import config from './config';
import logger from './lib/logger';
import loaders from './loaders';

const app = express();

loaders(app);

app.listen(config.api.port, (e) => {
  if (e) {
    logger.error(e);
    process.exit(1);
    return;
  }

  logger.info(`Server listening on: ${config.api.url}`);
});
