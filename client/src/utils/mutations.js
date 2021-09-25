import gql from 'graphql-tag';

export const LOGIN_USER = gql `
mutation login($email: String, $password: String!){
    login(email:$email, password:$password){
      token
        user{
      _id
      username
      email
    }}
  }
`;

export const ADD_USER = gql `
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    user {
      _id
      username
      email
    }
    token
  }
}
`;

export const SAVE_VICE = gql `
mutation saveVice($vice_type: String, $vice_id: ID){
  saveVice(vice_type: $vice_type, vice_id:$vice_id){
    _id
    item_id
    # vice_type
    name
    year
    country
    year
    type
    description
    imgsrc
  }
}`

export const SAVE_NOTE = gql `
mutation saveNote($item_id:ID, $content: String){
  saveNote(item_id:$item_id, content:$content){
    _id
    note
    owner_id
  }
  
}`;


export const SAVE_WINE = gql `
mutation saveWine($name: String,$year: String, $country: String, $type: String, $imgsrc: String,$description: String) {
  saveWine(name: $name, year: $year, country: $country, type: $type, imgsrc: $imgsrc,description: $description,) {
    name
    year
    country
    type
    description
    imgsrc
  }
}`;

export const REMOVE_ITEM = gql `
mutation removeFromVicebrary($vice_id: ID) {
    removeFromVicebrary(vice_id: $vice_id) {
        _id
    }
}
`;