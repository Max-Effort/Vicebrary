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
    Self {
        _id
        username
        email
        items {
            _id
            name
            vice_type
            vice_id
            imgsrc
        }
        notes {
            _id
            owner_id
            item_id
            content
        }
    }
}
`;