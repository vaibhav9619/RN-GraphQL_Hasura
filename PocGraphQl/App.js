import React from 'react'
import { ApolloProvider } from '@apollo/client/react'
import makeApolloClient from './src/graphQlUrl'
import MainApp from './src/routes/MainApp'
const App = () => {
  let tokenId  = 'Qt9qACunWxomhN2zzaa9ykC5tqrKzsEluvxuusiioDyvmv25Wn45WhZjphOrjQ5d'
  const client = makeApolloClient(tokenId)
  return (
    <ApolloProvider client={client}>
      <MainApp />
    </ApolloProvider>
  )
}
export default App;
