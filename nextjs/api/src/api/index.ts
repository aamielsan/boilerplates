import { Router } from 'express';
import config from '../config';
import authRouter from './routes/auth';
import publicRouter from './routes/public';

const routes: Array<{
  route: string;
  router: Router;
  prefix?: boolean;
}> = [
  {
    route: '/auth',
    router: authRouter,
    prefix: false,
  },
  {
    route: '/public',
    router: publicRouter,
  },
];

export default () => {
  const router = Router();
  const { prefix } = config.api;

  routes.forEach((r) => {
    const route = (r.prefix === false)
      ? r.route
      : `/${prefix}${r.route}`;
    router.use(route, r.router);
  });

  return router;
};
