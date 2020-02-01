import { Router } from 'express';
import authRouter from './auth';

const routes: Array<{
  route: string;
  router: Router;
}> = [
  {
    route: '/',
    router: authRouter,
  },
];

export default () => {
  const router = Router();
  routes.forEach(r => router.use(r.route, r.router));
  return router;
}