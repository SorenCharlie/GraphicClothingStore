const typeDefs = `
  type Clothing {
    _id: ID
    type: String
    color: String
    size: String
    graphics: String
    price: Float
  }

  type Order {
    _id: ID
    userId: ID
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
    updateOrder(orderId: ID!, products: [ClothingInput]): User
    deleteOrder(userId: ID!, orderId: ID!): Response
  }

  type Order {
    userId: ID
    products: [Clothing]
  }

  type OrderItem {
    orderId: ID
    quantity: Int
  }

  type Response {
    success: Boolean
    message: String
  }
`;

module.exports = typeDefs;
