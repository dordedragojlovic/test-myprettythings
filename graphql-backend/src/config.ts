import { config } from 'dotenv';

config();

const CONFIG = {
  PORT: process.env.PORT || '5000',
  MY_OKAY_CASH_WS_API_URL: process.env.MY_OKAY_CASH_WS_API_URL || 'wss://myokaycash-backend.herokuapp.com/graphql',
  MY_OKAY_CASH_HTTPS_API_URL:
    process.env.MY_OKAY_CASH_HTTPS_API_URL || 'https://myokaycash-backend.herokuapp.com/graphql',
};

export default CONFIG;
