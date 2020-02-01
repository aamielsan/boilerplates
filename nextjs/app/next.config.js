const fs = require('fs');
const dotenv = require('dotenv');
const webpack = require('webpack');

//
// ─── CONFIG ──────────────────────────────────────────────────────────────────────────
//

const config = {
  webpack: config => {
    config.plugins = config.plugins || []
    config.plugins = [
      ...config.plugins,
      new webpack.DefinePlugin(getGlobalConsts())
    ];
    return config
  }
};

//
// ─── UTILITY ─────────────────────────────────────────────────────────────────────────
//

const getGlobalConsts = () => {
  // Get process.env.*
  const envs = getProcessEnvs();
  return {
    ...envs,
  };
};

const getProcessEnvs = () => {
  // Get env values from process.env
  const getEnvValues = () => {
    const result = dotenv.config();

    if (result.error) {
      return { ...process.env };
    }

    return {
      ...process.env,
      ...result.parsed,
    };
  };

  // Get env keys from blueprint
  const getEnvKeys = () => {
    const defaults = { NODE_ENV: process.env.NODE_ENV };
    try {
      return {
        ...defaults,
        ...dotenv.parse(fs.readFileSync('./.env.blueprint', 'utf8')),
      }
    } catch (err) {
      console.log(err);
      return defaults;
    }
  };

  const keys = getEnvKeys();
  const values = getEnvValues();

  return Object.keys(keys).reduce((obj, key) => ({
    ...obj,
    [`process.env.${key}`]: JSON.stringify(values[key]),
  }), {});
};


//
// ─── EXPORTS ─────────────────────────────────────────────────────────────────────────
//

module.exports = config;
