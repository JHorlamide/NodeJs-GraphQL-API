import { buildSchema } from "graphql"

export const productsGQLSchema = buildSchema(`
    type Product {
      _id: String!
      name: String!
      price: Int!
    }

    type Query {
      products: productListResponse!
      product(id: String!): Product!
    }

    type productListResponse {
      status: String!
      products: [Product!]
    }

    type deleteProductResponse {
      status: String!
      message: String!
      productId: String!
    }

    type Mutation {
      createProduct(name: String!, price: Int!): Product!
      updateProduct(id: String!, name: String, price: Int): Product!
      deleteProduct(id: String!): deleteProductResponse!
    }
`)