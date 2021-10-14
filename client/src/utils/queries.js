import gql from 'graphql-tag';


export const QUERY_WINES = gql `
query Wines {
  Wines {
    _id
    name
    year
    country
    type
    description
    imgsrc
  }
}
`;

export const QUERY_WINE = gql `
query Wine($_id: ID){
  Wine{
    _id
      name
      year
      country
      type
      description
      imgsrc
    }}
  `;


export const QUERY_SELF = gql `
  query Self {
Self{
  _id
  username
  email
  items{
    _id
    owner_id
    vice_type
  vice_id
    vice{
      _id
      item_id
      owner_id
      name
      year
      country
      type
      description
      imgsrc
      
    }
    note
  }
}
  }

`;

export const QUERY_ITEMS = gql `
  query Items {
    Items{
     _id
    owner_id
    vice_type
  vice_id
    vice{
      _id
      item_id
      owner_id
      name
      year
      country
      type
      description
      imgsrc
      
    }
    note
  }
}
`;

export const QUERY_USER_ITEMS = gql `
query UserItems{
  UserItems{
    items{
      vice_id
    }
  }

}
`;

export const QUERY_NOTE = gql `
query getNote($_id:ID){
  Item(_id:$_id){
    note
  }
}`;