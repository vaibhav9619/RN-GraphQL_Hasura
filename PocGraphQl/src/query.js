import {gql} from '@apollo/client'
export const clientQuery  = gql`
query MyQuery {
  student {
    firstName
    lastName
  }
}

`;