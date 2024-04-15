import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    dateCreated: String
  }

  input UserInput {
    name: String
    lastName: String
    email: String
    password: String
  }

  type Query {
    getStudent: String
  }

  type Token {
    token: String
  }

  input UserAuthInput {
    email: String
    password: String
  }

  type Mutation {
    newUser(input: UserInput): User
    userAuth(input: UserAuthInput): Token
  }
`;

export default typeDefs;
