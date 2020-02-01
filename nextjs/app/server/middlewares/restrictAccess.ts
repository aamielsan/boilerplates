import { Response, NextFunction } from 'express';

export const restrictAccess = (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.send(401);
  }
  next();
};
