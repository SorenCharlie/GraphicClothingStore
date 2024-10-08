const { gql } = require ('apollo-server-express');

const typesDefs = gql`
type Clothing {
    id: ID
    type: String!
    color: String!
    size: String!
    graphics: String!
    price: Float!
}
type CartItem {
    clothing: Clothing!
    quantity: Int!
}

type Cart {
    id: ID
    items: [CartItem]!
    total: Float!
    status: String!
}

type Query {
    clothing: [Clothing!]!
    cart(userId: String!): Cart
}

type Mutation {
    addClothing(type: String!, color: String!, size: String!, graphics: String!, price: Float!): Clothing
    addToCart(userId: String!, clothingId: ID!, quantity: Int!): Cart
    removeFromCart(userId: String!, clothingId: ID!): Cart
    updateCartItem(userId: String!, clothingId: ID!, quantity: Int!): Cart
    }
    `;

module.exports = typesDefs;