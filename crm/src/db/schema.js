import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    dateCreated: String
  }

  input userInput {
    name: String
    lastName: String
    email: String
    password: String
  }

  type Query {
    getStudent: String
  }

  type Mutation {
    newUser(input: userInput): User
  }
`;

export default typeDefs;
