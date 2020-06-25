# Okay Demo (PrettyThings Eshop)

## Setup

1. Clone repository
1. `yarn install`
1. Generate GraphQL schema types by `yarn gen:types`
1. `yarn dev`
1. Application is running on [localhost:3000](http://localhost:3000/)

## Backend

Project has own GraphQL backend that is used as a secure proxy for communication with the payment service. 

This backend is used mainly for purchases and you can try it on: [localhost:3000/api/graphql](http://localhost:3000/api/graphql)
