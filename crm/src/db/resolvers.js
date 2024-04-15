import { validatePassword } from '../utils/validatePasswords.js';
import User from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const resolvers = {
  Query: {
    getStudent: () => 'Student found!',
  },
  Mutation: {
    newUser: async (_, { input }) => {
      const { email, password } = input;

      const userExists = await User.findOne({ email });

      if (userExists) {
        throw new Error('El usuario ya existe');
      }

      const salt = bcrypt.genSaltSync(10);

      input.password = await bcrypt.hash(password, salt);

      try {
        const newUser = new User(input);

        await newUser.save();

        return newUser;
      } catch (error) {
        console.error(error);
      }
    },

    userAuth: async (_, { input }) => {
      const { email, password } = input;

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('El usuario no existe');
      }

      if (!validatePassword(password, user.password)) {
        throw new Error('Contraseña incorrecta!');
      }

      const token = jwt.sign(
        {
          user,
        },
        'secret'
      );

      return { token };
    },
  },
};

export default resolvers;
