import React, { useState, useEffect } from 'react' 
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import ApolloClientProvider from './providers/ApolloProvider'
import ThemesProvider from './providers/ThemeProvider'
import './styles/components/App.css';

import Home from './views/Home'
import MovieDetails from './views/MovieDetails'
import NotFound from './views/NotFound'

const AppContainer = styled.div`
  background-color: ${props => props.theme.bg.primary};
  color: ${props => props.theme.text.primary};
`

function App({props}) {
  const [nominations, setNominations] = useState([])

  const addNomination = (nomination, err, setErr)  => {
    if (err) setErr(null)
    if (nominations && nominations.length >= process.env.REACT_APP_MAX_NOMINATIOINS) return setErr(new Error(`You can only nominate ${process.env.REACT_APP_MAX_NOMINATIOINS} movies.`))
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
    const stored = JSON.parse(localStorage.getItem("nominations"))
    const nominations = stored ? stored : []
    setNominations(nominations)
}, [])

  return (
    <ApolloClientProvider>
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
    </ApolloClientProvider>
  );
}

export default App;
