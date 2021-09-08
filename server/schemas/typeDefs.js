const { gql } = require('apollo-server-express');

const typeDefs = gql `
 
 type User{
     user: [User]
 }
 type Auth {
    token: ID!
    user: User
  }

type Query {
    users: [User]
    }
`;
module.exports = typeDefs;