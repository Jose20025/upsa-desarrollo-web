import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './db/schema';
import { connectDatabase } from './config/dbConfig';
import { resolvers } from './db/resolvers';
import { type TUser } from './types/user';
import { type Context } from './types/context';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
});

const startServer = async () => {
  await connectDatabase();

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization;

      if (!token) return {};

      try {
        return jwt.verify(token, process.env.SECRET_KEY || 'secreto') as {
          user: TUser;
        };
      } catch (error) {
        console.error('Error al verificar el token');
        console.error(error);

        return {};
      }
    },
  });

  console.log(`Server corriendo en ${url}`);
};

startServer().then();
