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

## Deployment

### Staging

Heroku is hosting staging backend on [prettythings-backend.herokuapp.com/](https://prettythings-backend.herokuapp.com/graphql). There is GitHub action for continuous deployment for `develop` branch. To set up own instance you just need to create new Heroku app, replace `HEROKU_BACKEND_APP_NAME` and generate and save to secrets own `HEROKU_API_KEY`.

### Production

AWS is hosting production backend on [https://demo-prettythings-backend.okaythis.com/](https://https://demo-prettythings-backend.okaythis.com/graphql). There is GitHub action for continuous deployment for `master` branch. Setting up own instance is more complex but there is Terraform configuration file that can be used. 

First, you need to create `variables.tf` and insert correct values: 
```hcl-terraform
variable "myokaycash_https_api_url" {
  default = "TODO"
}

variable "myokaycash_wss_api_url" {
  default = "TODO"
}

variable "aws_ssl_certificate_arn" {
  default = "TODO"
}
```

The second thing you need to configure is to put AWS access token into repository secrets as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. Keep in mind, you probably need to create container registry first, push first Docker image and then configure the rest. You can use GitHub Action as continuous deployment once you will have first deployment running. 
