import { ApolloServer } from 'apollo-server';
import { connectDatabase } from './config/db.js';
import jwt from 'jsonwebtoken';
import typeDefs from './db/schema.js';
import resolvers from './db/resolvers.js';

import 'dotenv/config.js';

// Levantar la base de datos
connectDatabase();

// Servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';

    if (!token) return;

    try {
      return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      console.error('Error al verificar el token');
      console.error(error.message);
    }
  },
});

server.listen().then(({ url }) => {
  console.log(url);
});
