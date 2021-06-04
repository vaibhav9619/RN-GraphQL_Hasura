import {ApolloClient,InMemoryCache} from '@apollo/client'
import {HttpLink} from 'apollo-link-http'

const makeApolloClient = (token)=>{
    const link = new HttpLink({
        uri:'https://react-demo.hasura.app/v1/graphql',
        headers:{
            'x-hasura-admin-secret':token
        }
    })
    
    const cache = new InMemoryCache()
    const client = new ApolloClient({
        link,
        cache
    })
    return client;
}



export default makeApolloClient;
