import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({graphqlErrors, networkError}) => {
    if (graphqlErrors) {
      console.log(graphqlErrors)
      graphqlErrors.map(({message, location, path}) => {
        console.log(`GraphQL error: ${message} at ${location} with ${path}.`)
        return message;
      })
    }
    if (networkError) {
      console.log(networkError)
    }
  })
  
const link = from([errorLink, new HttpLink({uri: process.env.REACT_APP_WEBSERVER_BASE_URL})])
const client = new ApolloClient({cache: new InMemoryCache(), link: link})

const ApolloClientProvider = ({children}) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

export default ApolloClientProvider;