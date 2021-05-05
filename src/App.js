import React, { useState, useEffect } from 'react'
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
  const [nominations, setNominations] = useState([])

  const addNomination = (nomination, err, setErr)  => {
    if (err) setErr(null)
    if (nominations.length >= process.env.REACT_APP_MAX_NOMINATIOINS) return setErr(new Error(`You can only nominate ${process.env.REACT_APP_MAX_NOMINATIOINS} movies.`))
    if (nominations && nominations.filter(n => n.imdbID === nomination.imdbID).length > 0) return;
    const updatedNominations = [...nominations, nomination]
    setNominations(updatedNominations)
    localStorage.setItem("nominations", JSON.stringify(updatedNominations))
  }

  const removeNomination = (id, err, setErr) => {
    if (err) setErr(null)
    const updatedNominations = nominations.filter(n => n.imdbID !== id)
    setNominations(updatedNominations)
    localStorage.setItem("nominations", JSON.stringify(updatedNominations))
  }

  useEffect(() => {
    const nominations = JSON.parse(localStorage.getItem("nominations"))
    setNominations(nominations)
}, [])

  return (
    <ApolloProvider client={client}>
      <ThemesProvider>
        <AppContainer className="App" {...props}>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact render={(props) => (<Home {...props} nominations={nominations} setNominations={setNominations} addNomination={addNomination} removeNomination={removeNomination} />)}/>
              <Route path="/movie" render={(props) => (<MovieDetails {...props} nominations={nominations} setNominations={setNominations} addNomination={addNomination} removeNomination={removeNomination} />)}/>
              <Route component={NotFound}/>
            </Switch>
          </BrowserRouter>
        </AppContainer>
      </ThemesProvider>
    </ApolloProvider>
  );
}

export default App;
