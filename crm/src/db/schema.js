import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    getStudent: String
  }
`;

export default typeDefs;
