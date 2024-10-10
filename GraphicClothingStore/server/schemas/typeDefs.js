const typeDefs = `
  type Clothing {
    type: String
    color: String
    size: String
    graphics: String
    price: Float
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Clothing]
  }

  type User {
    _id: ID
    username: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
    sessionId: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input ClothingInput {
    type: String
    color: String
    size: String
    graphics: String
    price: Float
  }

  type Query {
    user: User
    order(_id: ID!): Order
    checkout(products: [ClothingInput]): Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(products: [ClothingInput]!): Order
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    updateOrder(userId: ID!, itemId: ID!, quantity: Int!): Cart
    deleteOrder(userId: ID!): Response
  }

  type Cart {
    userId: ID
    items: [CartItem]
  }

  type CartItem {
    itemId: ID
    quantity: Int
  }

  type Response {
    success: Boolean
    message: String
    createCheckoutSession(items: [ClothingInput]!): Checkout
  }
`;

module.exports = typeDefs;
