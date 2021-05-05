import styled from 'styled-components'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import ThemeProvider from './components/ThemeProvider'
import './styles/App.css';

import { graphql } from 'graphql';

import Home from "./views/Home"

const errorLink = onError(({graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      console.log(`GraphQL error: ${message} at ${location} with ${path}.`)
    })
  }
})

const link = from([errorLink, new HttpLink({uri: process.env.REACT_APP_WEBSERVER_BASE_URL})])
const client = new ApolloClient({cache: new InMemoryCache(), link: link})


const AppContainer = styled.div`
  background-color: ${props => props.theme.bg.primary};
  color: ${props => props.theme.text.primary};
`

function App({props}) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <AppContainer className="App" {...props}>
          <Home/>
        </AppContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
