import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import ThemesProvider from './components/ThemeProvider'
import './styles/App.css';

import Home from './views/Home'
import MovieDetails from './views/MovieDetails'
import NotFound from './views/NotFound'

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


const AppContainer = styled.div`
  background-color: ${props => props.theme.bg.primary};
  color: ${props => props.theme.text.primary};
`

function App({props}) {
  return (
    <ApolloProvider client={client}>
      <ThemesProvider>
        <AppContainer className="App" {...props}>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/movie" component={MovieDetails}/>
              <Route component={NotFound}/>
            </Switch>
          </BrowserRouter>
        </AppContainer>
      </ThemesProvider>
    </ApolloProvider>
  );
}

export default App;
