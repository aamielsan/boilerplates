import './env';
import 'isomorphic-unfetch';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import next from 'next';

import config from '../config';
import routes from './routes';
import { populateUser } from './middlewares';

const app = next({ dev: config.isDev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const {
    url,
    port,
  } = config.app;

  const server = express();

  // Let next handle request for these routes
  server.get('/_next/*', (req, res) => {
    handler(req, res);
  });

  server.get('/static/*', (req, res) => {
    handler(req, res);
  });

  // Setup middlewares
  server.enable('trust proxy');
  server.use(cors());
  server.use(helmet());
  server.use(express.json());
  server.use(populateUser);

  // Populate routers
  server.use('/', routes());

  // Let next handle unmatched routes
  server.get('*', (req, res) => {
    handler(req, res);
  });

  // Start express server
  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Listening on ${url}`);
  });
});
