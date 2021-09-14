const { gql } = require('apollo-server-express');

const typeDefs = gql `
type Wine{
   _id: String
   name: String
   year: String
   country: String
   type: String
   description: String
   imgsrc: String

}

 type Item{
   _id: String
   name: String
   vice_type: String
   vice_id: String
 }

type Note{
   _id: String
   owner_id: String
   item_id: String
   content: String
}

 type Library{
   _id: ID
   owner_id: ID
   items:[Item]
   notes:[Note]
 }

 type User {
   _id: ID
   username: String
   email: String
 }

 type Self{
   _id: ID
   username: String
   email: String
   library: Library{
     
   }
    }
 
type Auth {
   token: ID!
   user: User
  }

type Query {
    Users: [User]
    Self(username: String): Self
    User(username: String!): User
    Library(owner_id: String): Library
    Item(_id: ID): Item
    Items:[Item]
    Wines: [Wine]
    }

type Mutation {
   login(email: String, password: String!): Auth
   addUser(username: String!, email: String!, password: String!): Auth
   saveItem(name:String, vice_type:String, vice_id:String):Item
   saveWine(name: String, year: String,country: String, type: String, description: String, imgsrc: String): Wine
   createLibrary(owner_id: String): Library
}
`;

module.exports = typeDefs;