import { Request, Response, NextFunction } from 'express';
import errors from '../../lib/errors';

export const checkAuth = (req: Request, _: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return next(errors[401]());
  }
  next();
};
