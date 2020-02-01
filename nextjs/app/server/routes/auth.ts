import { Router, Request, Response } from 'express';
import httpProxy from 'http-proxy';
import config from '../../config';

const router = Router();
const proxy = httpProxy.createProxy({
  target: `${config.api.url}/auth`,
});

router.get('/login', (req: Request, res: Response) => {
  // proxy /login to api/auth/login
  proxy.web(req, res);
});

router.get('/logout', (req: Request, res: Response) => {
  // proxy /logout to api/auth/logout
  proxy.web(req, res);
});

export default router;