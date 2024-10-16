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
    // tutor with Andres 38 minutes 15 seconds
    updateOrder: async (parent, { orderId, products }, context) => {
      if(context.user) {
        try {
          let updateOrder = await User.findOneAndUpdate(
            { "orders._id": orderId },
            { $set: { orders: { products: products } } },
            { new: true }
          )
          console.log('updateOrder:', updateOrder);
          return updateOrder;
        } catch (error) {
          console.error('Error in updateOrder resolver:', error);
          throw error;
        } 
      }
      throw AuthenticationError;
    },
    deleteOrder: async (parent, { userId, orderId }, context) => {
      if (context.user) {
        let result = await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { orders: { _id: orderId } } },
          { new: true }
        )
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
