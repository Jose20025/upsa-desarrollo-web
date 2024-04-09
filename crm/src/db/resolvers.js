import { Query } from 'mongoose';

const resolvers = {
  Query: {
    getStudent: () => 'Student found!',
  },
};

export default resolvers;
