import { useEffect } from 'react';
import styled from 'styled-components'

import ThemeProvider from './components/ThemeProvider'
import './styles/App.css';

const AppContainer = styled.div`
  background-color: ${props => props.theme.bg.primary};
  color: ${props => props.theme.text.primary};
`

function App({props}) {

  useEffect(() => {

  }, [])

  return (
    <ThemeProvider>
      <AppContainer className="App" {...props}>
        
        <header className="App-header">
            App Component
        </header>

      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
