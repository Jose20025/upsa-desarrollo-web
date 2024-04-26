import { gql } from 'apollo-server';

const typeDefs = gql`
  "Entidades"
  type User {
    _id: ID
    name: String
    lastName: String
    email: String
    dateCreated: String
  }

  type Product {
    _id: ID
    name: String
    stock: Int
    price: Float
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

  type Order {
    _id: ID
    products: [ProductGroup]
    total: Float
    client: ID
    seller: ID
    status: OrderStatus
    dateCreated: String
  }

  type ProductGroup {
    _id: ID
    quantity: Int
  }

  type Token {
    token: String
  }

  "Inputs"
  input UserInput {
    name: String
    lastName: String
    email: String
    password: String
  }

  input UserAuthInput {
    email: String
    password: String
  }

  input ProductInput {
    name: String
    stock: Int
    price: Float
  }

  input ClientInput {
    name: String
    lastName: String
    company: String
    email: String
    phoneNumber: String
  }

  input OrderInput {
    products: [OrderProductInput]
    total: Float
    client: ID
    status: OrderStatus
  }

  enum OrderStatus {
    PENDING
    APPROVED
    REJECTED
  }

  input OrderProductInput {
    _id: ID
    quantity: Int
  }

  "Queries"
  type Query {
    "User"
    getUser(token: String): User

    "Product"
    getAllProducts: [Product]
    getProductById(id: ID): Product

    "Client"
    getAllClients: [Client]
    getAllClientsBySellerId(id: String): [Client]
  }

  "Mutations"
  type Mutation {
    "User"
    newUser(input: UserInput): User
    userAuth(input: UserAuthInput): Token

    "Product"
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String

    "Client"
    newClient(input: ClientInput): Client
    updateClient(id: ID, input: ClientInput): Client
    deleteClient(id: ID): String

    "Order"
    newOrder(input: OrderInput): Order
    updateOrder(input: OrderInput, id: ID!): Order
    deleteOrder(id: ID!): String
  }
`;

export default typeDefs;
