const IS_DEV = process.env.NODE_ENV !== 'production';

// api
const API_URL_PREFIX = get('API_URL_PREFIX') || 'api/v1';
const API_PORT = +(get('API_PORT') || 8000);
const apiUrl = IS_DEV ? get('API_URL') || 'localhost' : get('API_URL', true);
const API_URL = getUrl(apiUrl, API_PORT);

// app
const APP_PORT = +(get('APP_PORT') || 3000);
const appUrl = IS_DEV ? get('APP_URL') || 'localhost' : get('APP_URL', true);
const APP_URL = getUrl(appUrl, APP_PORT);

//
// ─── CONFIG ──────────────────────────────────────────────────────────────────────────
//

const config: AppConfig = {
  isDev: IS_DEV,
  api: {
    url: API_URL,
    port: API_PORT,
    prefix: API_URL_PREFIX,
  },
  app: {
    url: APP_URL,
    port: APP_PORT,
  },
  log: {
    level: get('LOG_LEVEL') || 'info',
  },
  auth0: {
    domain: get('AUTH0_DOMAIN', true) || '',
    clientId: get('AUTH0_CLIENT_ID', true) || '',
    clientSecret: get('AUTH0_CLIENT_SECRET', true) || '',
    callbackUrl: get('AUTH0_CALLBACK_URL') || `${API_URL}/auth/callback`,
  },
};

//
// ─── TYPES ───────────────────────────────────────────────────────────────────────────
//

interface AppConfig {
  isDev: boolean;
  log: {
    level: string;
  };
  api: {
    url: string;
    port: number;
    prefix: string;
  };
  app: {
    url: string;
    port: number;
  };
  auth0: {
    domain: string;
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
}

//
// ─── UTILITY ─────────────────────────────────────────────────────────────────────────
//

function get(key: string, required: boolean = false): string | undefined {
  if (process.env[key]) {
    return process.env[key];
  }

  const value = (IS_DEV)
    ? process.env[`DEVELOPMENT_${key}`]
    : process.env[`PRODUCTION_${key}`];

  if (value) {
    return value;
  }

  if (required) {
    throw new Error(`Environment variable '${key}' is required`);
  }

  return undefined;
}

function getUrl(host: string = '', port: string | number): string {
  const protocol = host.indexOf('http') > -1
    ? ''
    : IS_DEV
      ? 'http'
      : 'https'
  return `${protocol}://${host}:${port}`;
}

//
// ─── EXPORTS ─────────────────────────────────────────────────────────────────────────
//

export default config;
