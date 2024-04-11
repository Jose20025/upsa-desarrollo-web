import User from '../models/User.model.js';

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

      try {
        const newUser = new User(input);

        await newUser.save();

        return newUser;
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default resolvers;
