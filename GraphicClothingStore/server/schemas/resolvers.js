const { User, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;

      // Create a new order in the database
      await Order.create({ products: args.products.map(({ _id }) => _id) });

      const line_items = args.products.map(product => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
            images: [`${url}/images/${product.image}`]
          },
          unit_amount: product.price * 100, // Convert to cents
        },
        quantity: product.purchaseQuantity,
      }));

      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items,
          mode: 'payment',
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`,
        });

        return { session: session.id };
      } catch (error) {
        console.error('Error creating checkout session:', error);
        throw new Error('Unable to create checkout session');
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { userId, products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw AuthenticationError;
    },
    updateOrder: async (parent, { userId, orderId, productId, type }, context) => {
      try {
        let updateOrder = await User.findOneAndUpdate(
          { "orders._id": orderId },
          { $set: { orders: { products: { _id: productId, type} } } },
          { new: true }
        )
        console.log('updateOrder:', updateOrder);
        return updateOrder;
      } catch (error) {
        console.error('Error in updateOrder resolver:', error);
        throw error;
      }
      // if (context.user) {
      //   const order = await Order.findById(orderId);
      //   if (!order) {
      //     throw new Error('Order not found');
      //   }

      //   const productIndex = order.products.findIndex(product => product._id.toString() === productId);
      //   if (productIndex === -1) {
      //     throw new Error('Product not found in order');
      //   }

      //   // Update the quantity of the product
      //   order.products[productIndex].type = type;
      //   await order.save();
      //   return order;
      // }

      // if (context.user) {
      //   // First, find the user by userId
      //   const user = await User.findById(userId);
      //   if (!user) {
      //     throw new Error('User not found');
      //   }
      //   console.log('Found user:', user._id);

      //   // find the order by orderId
      //   const order = await Order.findById(orderId);
      //   if (!order) {
      //     throw new Error('Order not found');
      //   }

      //   // Check if the order belongs to the user
      //   if (order.userId.toString() !== userId) {
      //     console.log('Found order:', order);
      //     throw new Error('Order does not belong to the user');
      //   }

      //   const productIndex = order.products.findIndex(product => product._id.toString() === productId);
      //   if (productIndex === -1) {
      //     throw new Error('Product not found in order');
      //   }

      //   // Update the type of the product
      //   order.products[productIndex].type = type;
      //   await order.save();
      //   return order;
      // }
      //     console.log('updateOrder resolver called');
      // try {
      //   if (!context.user) {
      //     console.log('No user in context');
      //     throw new AuthenticationError('Must be logged in');
      //   }

      //   console.log('Updating order:', { userId, orderId, productId, type });

      //   // First, find the user by userId
      //   const user = await User.findById(userId);
      //   console.log('User query result:', user);
      //   if (!user) {
      //     console.log('User not found');
      //     throw new Error('User not found');
      //   }

      //   // Now find the order by orderId
      //   const order = await Order.findById(orderId);
      //   console.log('Order query result:', order);
      //   if (!order) {
      //     console.log('Order not found');
      //     throw new Error('Order not found');
      //   }

      //   const productIndex = order.products.findIndex(product => product._id.toString() === productId);
      //   console.log('Product index:', productIndex);
      //   if (productIndex === -1) {
      //     console.log('Product not found in order');
      //     throw new Error('Product not found in order');
      //   }

      //   // Update the type of the product
      //   order.products[productIndex].type = type;
      //   const savedOrder = await order.save();
      //   console.log('Order saved:', savedOrder);
      //   return savedOrder;

      // } catch (error) {
      //   console.error('Error in updateOrder resolver:', error);
      //   throw error;
      // }


      throw AuthenticationError;
    },
    deleteOrder: async (parent, { userId }, context) => {
      if (context.user) {
        const result = await Order.findOneAndDelete({ userId });
        if (!result) {
          throw new Error('Order not found or already deleted');
        }
        return { success: true, message: 'Order deleted successfully' };
      }

      throw AuthenticationError;
    },
  }
};

module.exports = resolvers;
