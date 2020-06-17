import { gql } from 'apollo-server-micro';

export default gql`
  type Query {
    helloWorld: String
  }
`;
