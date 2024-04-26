import gql from 'graphql-tag';

export const typeDefs = gql`
  type Token {
    token: String
  }

  type User {
    _id: ID
    name: String
    lastName: String
    email: String
    password: String
    dateCreated: String
  }

  type Product {
    _id: ID
    name: String
    price: Float
    stock: Int
    dateCreated: String
  }

  type Client {
    _id: ID
    name: String
    lastName: String
    company: String
    email: String
    phoneNumber: String
    dateCreated: String
    seller: ID
  }

  "Inputs"
  input UserInput {
    name: String
    lastName: String
    email: String
    password: String
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  input ProductInput {
    name: String
    price: Float
    stock: Int
  }

  input ClientInput {
    name: String
    lastName: String
    company: String
    email: String
    phoneNumber: String
  }

  "Queries"
  type Query {
    "User"
    getAllUsers: [User]

    "Product"
    getAllProducts: [Product]

    "Clients"
    getAllClients: [Client]
    getAllClientsBySeller(id: ID!): [Client]
  }

  "Mutations"
  type Mutation {
    "User"
    createNewUser(input: UserInput!): User
    userLogin(input: UserLoginInput!): Token

    "Product"
    createNewProduct(input: ProductInput!): Product
    updateProduct(id: ID!, input: ProductInput!): Product
    deleteProduct(id: ID!): String

    "Client"
    createNewClient(input: ClientInput!): Client
    updateClient(id: ID!, input: ClientInput!): Client
    deleteClient(id: ID!): String
  }
`;
