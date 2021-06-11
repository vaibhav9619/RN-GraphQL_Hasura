import {gql} from '@apollo/client'
export const getDetailsQuery  = gql`
query MyQuery {
  student {
    firstName
    lastName
    phoneNo
  }
}
`;

// insert data into table
export const insertDetailQuery = gql`
mutation($name:String, $surname:String,$phone:bigint){
    insert_student(
      objects:[{
        firstName: $name,
        lastName: $surname,
        phoneNo:$phone
      }]
    ){
      returning{
        id
        firstName
        lastName
        phoneNo
      }
    }  
}
`
export const removeQuery = gql`
mutation($id:Int){
  delete_student(
  where:{
    id:{
      _eq: $id
    }
  }
  ){
    returning{
      id
      firstName
      lastName
      phoneNo
    }
  }
}
`

export const subscription = gql`
subscription{
  student{
    firstName
    lastName
    phoneNo
  }
}
`