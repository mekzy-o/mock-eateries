import { config } from 'dotenv';

config();

export const development = {
  use_env_variable: 'DATABASE_URL',
  logging: false,
};

export const test = {
  use_env_variable: 'TEST_DATABASE_URL',
  logging: false,
};

export const production = {
  use_env_variable: 'DATABASE_URL',
};
