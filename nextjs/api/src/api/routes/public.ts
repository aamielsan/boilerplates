import { Container } from 'typedi';
import { Router } from 'express';
import UserSvc from '../../services/user';

const router = Router();

router.get('/get-user', (req, res) => {
  const svc = Container.get(UserSvc);
  const user = svc.getUserFromRequest(req);
  return res.json({ user });
});

export default router;
