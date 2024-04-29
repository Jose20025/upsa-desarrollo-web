import gql from 'graphql-tag';

export const typeDefs = gql`
  "Enum"
  enum OrderStatus {
    PENDING
    APPROVED
    REJECTED
  }

  "Types"
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

  type ProductGroup {
    product: ID
    quantity: Int
  }

  type Order {
    _id: ID
    products: [ProductGroup]
    total: Float
    client: ID
    seller: ID
    status: OrderStatus
    dateCreated: String
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

  input OrderProductInput {
    _id: ID
    quantity: Int
  }

  input OrderInput {
    products: [OrderProductInput]
    total: Float
    client: ID
    status: OrderStatus
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

    "Order"
    createNewOrder(input: OrderInput): Order
    deleteOrder(id: ID!): String
  }
`;
