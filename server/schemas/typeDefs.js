const { gql } = require('apollo-server-express');

const typeDefs = gql `
type Wine{
  author_id: ID
   _id: ID
   name: String
   year: String
   country: String
   type: String
   description: String
   imgsrc: String
}

type Vice{
  _id:ID
  owner_id:ID
  item_id:ID
  vice_id:ID
  name: String
   year: String
   country: String
   type: String
   description: String
   imgsrc: String
}

 type Item{
   _id: ID
   owner_id: ID
   vice_type: String
   vice_id: ID
   vice:[Vice]
   note: String
 }

type userItems{
  items:[Item] 
}



#  type Library{
#    _id: ID
#    owner_id: ID
#    items:[Item]
#    notes:[Note]
#  }

 type User {
   _id: ID
   username: String
   email: String
   items:[Item]
   vices:[Vice]

 }

 type Self{
   _id: ID
   username: String
   email: String
  items:[Item] 
  }
 
type Auth {
   token: ID!
   user: User
  }

type Query {
    Users: [User]
    Self:Self
    UserItems: userItems
    User(username: String!): User
    # Library(owner_id: String): Library
    Item(_id: ID): Item
    Items:[Item]
    Vice(item_id: ID):Vice
    Vices:[Vice]
    Wines: [Wine]
    Wine(_id:ID):Wine
    }

type Mutation {
  # add remove note & remove item
   login(email: String, password: String!): Auth
   addUser(username: String!, email: String!, password: String!): Auth
   saveVice(owner_id:ID,item_id:ID, vice_type:String, vice_id:ID):Vice
   saveItem(owner_id:ID, vice_type:String, vice_id:ID, note:String):Item
   saveWine(author_id: ID, name: String, year: String, country: String, type: String, description: String, imgsrc: String): Wine
   saveNote(item_id: ID, content: String): Item
   removeFromVicebrary(vice_id:ID):Self
}
`;

module.exports = typeDefs;