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

type Vice{
  _id:ID
  owner_id:ID
  item_id:ID
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

# type Note{
#    _id: String
#    owner_id: String
#    item_id: String
#    content: String
# }

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
    Self: Self
    User(username: String!): User
    # Library(owner_id: String): Library
    Item(_id: ID): Item
    Vice(item_id: ID):Vice
    Vices:[Vice]
    Items:[Item]
    Wines: [Wine]
    Wine(_id:ID):Wine
    }

type Mutation {
  # add remove note & remove item
   login(email: String, password: String!): Auth
   addUser(username: String!, email: String!, password: String!): Auth
   saveToVicebrary(owner_id:ID,item_id:ID, vice_type:String, vice_id:ID):Vice
   saveItem(owner_id:ID, vice_type:String, vice_id:ID, note:String):Item
   saveWine(name: String, year: String,country: String, type: String, description: String, imgsrc: String): Wine
   saveNote(item_id: ID, content: String): Item
  #  createLibrary(owner_id: String): Library
}
`;

module.exports = typeDefs;