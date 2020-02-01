import { config } from 'dotenv';

const { error, parsed } = config();

// Only override process.env if .env file is present and valid
if (
  !error
  && parsed
) {
  Object.keys(parsed).forEach((key: string) => {
    const value = parsed[key];
    if (value) {
      process.env[key] = value;
    }
  });
}
