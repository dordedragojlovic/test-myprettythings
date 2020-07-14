import { config } from 'dotenv';
import { Config } from './types';

config();

const CONFIG: Config = {
  PORT: process.env.PORT || '5000',
  MY_OKAY_CASH_WS_API_URL: process.env.MY_OKAY_CASH_WS_API_URL || 'wss://demo-myokaycash-backend.okaythis.com/graphql',
  MY_OKAY_CASH_HTTPS_API_URL:
    process.env.MY_OKAY_CASH_HTTPS_API_URL || 'https://demo-myokaycash-backend.okaythis.com/graphql',
  DATABASE_NAME: 'pretty_things.db',
  TEST_DATABASE_NAME: 'pretty_things_test.db',
};

export default CONFIG;
