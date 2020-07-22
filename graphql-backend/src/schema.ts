import { gql } from 'apollo-server';

export default gql`
  type Query {
    purchase(id: ID!): PurchaseStatus!
  }

  type Mutation {
    createPurchase(purchase: PurchaseInput!): PurchaseStatus!
    reset: Boolean!
  }

  type Subscription {
    purchasePaid(id: ID!): Boolean!
  }

  type PurchaseStatus {
    id: ID!
    paid: Boolean!
    confirmed: Boolean!
    items: [PurchaseItem!]!
  }

  type PurchasePaidConfirmation {
    id: ID!
  }

  type PurchaseItem {
    id: ID!
    amount: Int!
    price: Float!
  }
  input PurchaseItemInput {
    id: ID!
    amount: Int!
    price: Float!
  }

  enum Banks {
    MyOkayCash
  }

  input PaymentInfo {
    bank: Banks!
    cardNumber: String!
    cvc: String!
    validity: String!
  }

  input PurchaseInput {
    items: [PurchaseItemInput!]!
    paymentInfo: PaymentInfo!
  }
`;
