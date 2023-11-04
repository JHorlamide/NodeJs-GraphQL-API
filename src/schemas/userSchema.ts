import { buildSchema } from "graphql";

export const usersGQLSchema = buildSchema(`
    type User {
      _id: String!
      username: String!
      email: String!
      password: String!
    }

    type Query {
      users: usersListResponse!
      user(id: String!): User!
    }

    type usersListResponse {
      status: String!
      users: [User!]
    }

    type deleteResponse {
      status: String!
      message: String!
      userId: String!
    }

    type Mutation {
      registerUser(username: String!, email: String!, password: String!): User!
      loginUser(email: String!, password: String!): User!
      updateUser(id: String!, username: String, email: String, password: String): User!
      deleteUser(id: String!): deleteResponse!
    }
`)
