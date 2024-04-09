import { ApolloServer } from 'apollo-server';
import { connectDatabase } from './config/db.js';
import typeDefs from './db/schema.js';
import resolvers from './db/resolvers.js';

// Levantar la base de datos
connectDatabase();

// Servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(url);
});
