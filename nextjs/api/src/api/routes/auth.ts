import { Router } from 'express';
import passport from 'passport';
import config from '../../config';

const router = Router();

router.get('/login',
  passport.authenticate('auth0', {
    scope: 'openid email profile',
  }),
  (_, res) => res.redirect('/'),
);

router.get('/callback', (req, res, next) => {
  passport.authenticate('auth0', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/auth/login');
    }

    req.logIn(user, (e) => {
      if (e) {
        return next(e);
      }
      res.redirect(config.app.url);
    });
  })(req, res, next);
});

router.get('/logout',
  (req, res) => {
    const { auth0, app } = config;
    const { domain, clientId } = auth0;
    req.logout();
    res.redirect(`https://${domain}/logout?client_id=${clientId}&returnTo=${app.url}`);
  },
);

export default router;
