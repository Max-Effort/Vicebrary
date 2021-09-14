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

export const QUERY_SELF = gql `
query Self($username: String!) {
  Self(username: $username) {
    _id
    username
    email
    library {
      owner_id
      items {
        _id
        name
        vice_type
        vice_id
      }
      notes {
        _id
        owner_id
        item_id
        content
      }
    }
  }
}
`;

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