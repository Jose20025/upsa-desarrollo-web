import { validatePassword } from '../utils/validatePasswords.js';
import User from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Product from '../models/Product.model.js';
import Client from '../models/Client.model.js';

const resolvers = {
  Query: {
    getUser: (_, { token }) => {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      return decoded.user;
    },

    getAllProducts: async () => {
      try {
        const products = await Product.find();

        return products;
      } catch (error) {
        console.error(error);
      }
    },

    getProductById: async (_, { id }) => {
      try {
        const product = await Product.findById(id);

        return product;
      } catch (error) {
        console.error(error);
      }
    },

    getAllClients: async (_, __, context) => {
      console.log(context);

      try {
        const clients = await Client.find({ seller: context.user._id });

        return clients;
      } catch (error) {
        console.error(error);
      }
    },

    getAllClientsBySellerId: async (_, { id }) => {
      try {
        const clients = await Client.find({ seller: id });

        return clients;
      } catch (error) {
        console.error(error.message);
      }
    },
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
        process.env.SECRET_KEY,
      );

      return { token };
    },

    newProduct: async (_, { input }) => {
      const { name } = input;

      const productExists = await Product.findOne({ name });

      if (productExists) throw new Error('El producto ya existe');

      try {
        const newProduct = new Product(input);

        await newProduct.save();

        return newProduct;
      } catch (error) {
        console.error(error);
      }
    },

    updateProduct: async (_, { id, input }) => {
      const product = await Product.findById(id);

      if (!product) throw new Error('El producto no existe');

      try {
        const updatedProduct = await Product.findByIdAndUpdate(
          { _id: id },
          input,
          { new: true },
        );

        return updatedProduct;
      } catch (error) {
        console.error(error);
      }
    },

    deleteProduct: async (_, { id }) => {
      try {
        const product = await Product.findById(id);

        if (!product) throw new Error('Burro, no existe');

        await product.deleteOne();

        return 'Belleza, eliminau';
      } catch (error) {
        console.error(error);

        return 'Error';
      }
    },

    newClient: async (_, { input }, context) => {
      const { email, name } = input;

      const client = await Client.findOne({ email });

      if (client)
        throw new Error(
          `El cliente ${name} con el email de ${email} ya existe`,
        );

      const newClient = new Client(input);

      newClient.seller = context.user._id;

      await newClient.save();

      return newClient;
    },

    updateClient: async (_, { id, input }, context) => {
      try {
        const client = await Client.findById(id);

        if (!client) throw new Error('El cliente no existe');

        if (client.seller.toString() !== context.user._id)
          throw new Error('No puede editar un cliente que no es suyo');

        const updatedClient = await Client.findByIdAndUpdate(id, input, {
          new: true,
        });

        return updatedClient;
      } catch (error) {
        console.error(error.message);
      }
    },

    deleteClient: async (_, { id }, context) => {
      try {
        const client = await Client.findById(id);

        if (!client) throw new Error('El cliente no existe');

        if (client.seller.toString() !== context.user._id)
          throw new Error('No puede eliminar un cliente que no es suyo');

        await Client.findByIdAndDelete(id);

        return 'Se ha eliminado con exito';
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};

export default resolvers;
