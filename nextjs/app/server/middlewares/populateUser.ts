import { Request, Response, NextFunction } from 'express';
import get from 'lodash/get';
import config from '../../config';

const publicEndpoint = `${config.api.url}/${config.api.prefix}/public`;

// TODO: FixMe
export const populateUser = async (req: Request | any, _: Response, next: NextFunction) => {
  try {
    const cookie = get(req, 'headers.cookie');

    if (!cookie) {
      return next();
    }

    // Extract user from cookie using api
    const data = await fetch(
      `${publicEndpoint}/get-user`,
      {
        headers: { cookie },
      }
    );

    // Attach user to request object
    const { user } = await data.json();
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
}

