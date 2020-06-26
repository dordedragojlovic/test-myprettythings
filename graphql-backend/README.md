# Okay Demo (PrettyThings Backend)

## Setup

1. Clone repository
1. `yarn install`

## Environment variables

Create `.env` file:

```.env
PORT=5000 # Optional
MY_OKAY_CASH_WS_API_URL=wss://myokaycash-backend.herokuapp.com/graphql
MY_OKAY_CASH_HTTPS_API_URL=https://myokaycash-backend.herokuapp.com/graphql
DATABASE_NAME=pretty_things.db
TEST_DATABASE_NAME=pretty_things_test.db
```

## Run backend locally

1. Generate GraphQL schema types by `yarn gen:types`
1. `yarn dev`
1. Backend is running on [localhost:5000](http://localhost:5000/)
