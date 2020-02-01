const IS_DEV = process.env.NODE_ENV !== 'production';

// api
const API_URL_PREFIX = get('API_URL_PREFIX') || 'api/v1';
const API_PORT = +(get('API_PORT') || 8000);
const API_URL = IS_DEV ? get('API_URL') || 'localhost' : get('API_URL', true);

// app
const APP_PORT = +(get('APP_PORT') || 3000);
const APP_URL = IS_DEV ? get('APP_URL') || 'localhost' : get('APP_URL', true);

//
// ─── CONFIG ──────────────────────────────────────────────────────────────────────────
//

const config: AppConfig = {
  isDev: IS_DEV,
  api: {
    url: getUrl(API_URL, API_PORT),
    port: API_PORT,
    prefix: API_URL_PREFIX,
  },
  app: {
    url: getUrl(APP_URL, APP_PORT),
    port: APP_PORT,
  },
  log: {
    level: get('LOG_LEVEL') || 'info',
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