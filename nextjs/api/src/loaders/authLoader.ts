import { Express } from 'express';
import path from 'path';
import uid from 'uid-safe';
import passport from 'passport';
import session from 'express-session';
import { Strategy as Auth0Strategy } from 'passport-auth0';
import config from '../config';

export default (app: Express) => {
  const {
    domain,
    clientId,
    clientSecret,
    callbackUrl,
  } = config.auth0;

  const sessionStore = makeSessionStore();
  const sessionConfig = {
    secret: uid.sync(18),
    store: sessionStore,
    cookie: {
      maxAge: 86400 * 1000, // 24 hours in milliseconds
    },
    resave: false,
    saveUninitialized: true,
  };

  // Configure strategy
  const auth0Strategy = new Auth0Strategy({
      domain,
      clientSecret,
      clientID: clientId,
      callbackURL: callbackUrl,
    },
    (_, __, ___, profile, done) => done(null, profile),
  );

  // Configure passport
  passport.use(auth0Strategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  return app;
};

const makeSessionStore = () => {
  const store = require('connect-loki')(session);
  return new store({
    path: path.resolve(__dirname, '../data/session-store.db'),
  });
};
