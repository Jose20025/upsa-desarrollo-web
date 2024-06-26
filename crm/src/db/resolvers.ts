import { validatePassword } from '../utils/validatePassword';
import { type Context } from '../types/context';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Product from '../models/Product';
import Client from '../models/Client';
import 'dotenv/config';
import Order, { OrderStatus } from '../models/Order';

interface CreateUserArgs {
  input: {
    name: string;
    lastName: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
  input: {
    email: string;
    password: string;
  };
}

interface CreateProductArgs {
  input: {
    name: string;
    price: number;
    stock: number;
  };
}

interface UpdateProductArgs {
  input: {
    name?: string;
    price?: number;
    stock?: number;
  };
  id: string;
}

interface CreateClientArgs {
  input: {
    name: string;
    lastName: string;
    company: string;
    email: string;
    phoneNumber: string;
  };
}

interface UpdateClientArgs {
  input: {
    name?: string;
    lastName?: string;
    company?: string;
    email?: string;
    phoneNumber?: string;
  };
  id: string;
}

interface OrderProductArgs {
  _id: string;
  quantity: number;
}

interface CreateOrderArgs {
  input: {
    products: OrderProductArgs[];
    total?: number;
    client: string;
    status?: OrderStatus;
  };
}

export const resolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        const users = await User.find();

        return users;
      } catch (error) {
        console.error(error);
      }
    },

    getAllProducts: async () => {
      try {
        const products = await Product.find();

        return products;
      } catch (error) {
        console.error(error);
      }
    },

    getAllClients: async (_: any, __: any, context: Context) => {
      try {
        if (!context.user)
          throw new Error('No hay ID del vendedor en autorización');

        const clients = await Client.find({ seller: context.user._id });

        return clients;
      } catch (error) {
        console.error(error);
      }
    },

    getAllClientsBySeller: async (_: any, { id }: { id: string }) => {
      try {
        const clients = await Client.find({ seller: id });

        return clients;
      } catch (error) {
        console.error(error);
      }
    },
  },
  Mutation: {
    createNewUser: async (_: any, { input }: CreateUserArgs) => {
      try {
        const userExists = await User.findOne({ email: input.email });

        if (userExists) throw new Error('El usuario ya existe');

        const salt = bcrypt.genSaltSync(10);

        input.password = await bcrypt.hash(input.password, salt);

        const newUser = new User(input);

        await newUser.save();

        return newUser;
      } catch (error) {
        console.error(error);
      }
    },

    userLogin: async (_: any, { input }: LoginUserArgs) => {
      try {
        const user = await User.findOne({ email: input.email });

        if (!user)
          throw new Error(`No existe un usuario con el correo: ${input.email}`);

        if (!validatePassword(input.password, user.password))
          throw new Error('Contraseña incorrecta');

        const token = jwt.sign(
          {
            user,
          },
          process.env.SECRET_KEY || 'secreto',
        );

        return { token };
      } catch (error) {
        console.error(error);
      }
    },

    createNewProduct: async (_: any, { input }: CreateProductArgs) => {
      try {
        const productExists = await Product.findOne({ name: input.name });

        if (productExists) throw new Error('El producto ya existe!');

        const newProduct = new Product(input);

        await newProduct.save();

        return newProduct;
      } catch (error) {
        console.error(error);
      }
    },

    updateProduct: async (_: any, { id, input }: UpdateProductArgs) => {
      try {
        const product = await Product.findById(id);

        if (!product) throw new Error('El producto no existe!');

        product.name = input.name ?? product.name;
        product.stock = input.stock ?? product.stock;
        product.price = input.price ?? product.price;

        await product.save();

        return product;
      } catch (error) {
        console.error(error);
      }
    },

    deleteProduct: async (_: any, { id }: UpdateProductArgs) => {
      const product = await Product.findById(id);

      if (!product) throw new Error('El producto no existe!');

      await product.deleteOne();
      // await Product.findByIdAndDelete(id);

      return 'La joda, se eliminó';
    },

    createNewClient: async (
      _: any,
      { input }: CreateClientArgs,
      context: Context,
    ) => {
      try {
        const clientExists = await Client.findOne({ email: input.email });

        if (clientExists)
          throw new Error(
            `El cliente ${input.name} con el email de ${input.email} ya existe`,
          );

        if (!context.user)
          throw new Error('No hay ID del vendedor en autorización');

        console.log(context.user);

        const newClient = new Client(input);

        newClient.seller = context.user._id;

        await newClient.save();

        return newClient;
      } catch (error) {
        console.error(error);
      }
    },

    updateClient: async (
      _: any,
      { id, input }: UpdateClientArgs,
      context: Context,
    ) => {
      try {
        if (!context.user)
          throw new Error('No hay ID del vendedor en autorización');

        const client = await Client.findById(id);

        if (!client) throw new Error('El cliente no existe');

        if (client.seller.toString() !== context.user._id.toString())
          throw new Error('No puede editar un cliente que no es suyo!');

        client.name = input.name ?? client.name;
        client.lastName = input.lastName ?? client.lastName;
        client.company = input.company ?? client.company;
        client.email = input.email ?? client.email;
        client.phoneNumber = input.phoneNumber ?? client.phoneNumber;

        await client.save();

        return client;
      } catch (error) {
        console.error(error);
      }
    },

    deleteClient: async (_: any, { id }: { id: string }, context: Context) => {
      try {
        const client = await Client.findById(id);

        if (!client) throw new Error('El cliente no existe');

        if (client.seller.toString() !== context.user!._id.toString())
          throw new Error('No puede eliminar un cliente que no es suyo');

        await client.deleteOne();

        return 'Se ha eliminado con éxito';
      } catch (error) {
        console.error(error);
      }
    },

    createNewOrder: async (
      _: any,
      { input }: CreateOrderArgs,
      context: Context,
    ) => {
      try {
        const client = await Client.findById(input.client);

        if (!client) throw new Error('El cliente no existe');

        if (client.seller.toString() !== context.user!._id.toString())
          throw new Error(
            'No puede asignar una orden a un cliente que no es suyo',
          );

        let orderTotal: number = 0;

        for (let index = 0; index < input.products.length; index++) {
          const productGroup = input.products[index];

          const productFromDB = await Product.findById(productGroup._id);

          if (!productFromDB)
            throw new Error(
              `El producto con id: ${productGroup._id} no existe`,
            );

          if (productGroup.quantity > productFromDB.stock)
            throw new Error(
              `El stock del producto ${productFromDB.name} no es suficiente`,
            );

          productFromDB.stock -= productGroup.quantity;
          orderTotal += productFromDB.price * productGroup.quantity;

          await productFromDB.save();
        }

        const newOrder = new Order({
          ...input,
          seller: context.user!._id,
          total: orderTotal,
        });

        await newOrder.save();

        return newOrder;
      } catch (error) {
        console.error(error);
      }
    },
    deleteOrder: async (_: any, { id }: { id: string }, context: Context) => {
      try {
        const order = await Order.findById(id);

        if (!order) throw new Error('La orden no existe');

        if (order.seller.toString() !== context.user!._id.toString())
          throw new Error('No puedes eliminar una orden que no es tuya!');

        await order.deleteOne();

        return 'Eliminada con éxito';
      } catch (error) {
        console.error(error);
      }
    },
  },
};
