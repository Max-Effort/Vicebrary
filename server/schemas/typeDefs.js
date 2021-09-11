const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type Item{
    _id: String
    name: String
    type: String
    description: String
    imgsrc: String
 }

type Note{
    _id: String
    owner_id: String
    item_id: String
    content: String
}

 type Library{
    owner_id: String
    items:[Item]
    notes:[Note]
 }

 type User {
    _id: ID
    username: String
    email: String
 }

 type Self{
    _id: ID!
    username: String
    email: String
    library: Library
 }
 
 type Auth {
    token: ID!
    user: User
  }

  input saveItemInput{
      itemId: ID!
      name: String
      type: String
      description: String
      imgsrc: String

  }

type Query {
    Users: [User]
    Self(username: String!): Self
    User(username: String!): User
    Library: Library
   
    }

type Mutation {
    login(email: String, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveItem(saveItemInput:saveItemInput): User
}`;
module.exports = typeDefs;