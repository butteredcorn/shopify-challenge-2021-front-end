import {useContext} from 'react'
import styled from 'styled-components'
import { ThemeContext } from "./ThemeProvider"
import '../styles/HomeHeader.css'

const HomeHeaderContainer = styled.section`
    background-color: ${props => props.theme.bg.primary};
    color: ${props => props.theme.text.tertiary};
    border: 1px solid ${props => props.theme.bg.primary};
`

const HomeHeader = () => {
    const { currentTheme, dispatch } = useContext(ThemeContext);

    const toggleTheme = () => {
        dispatch({ type: "toggleTheme" });
    };

    return (
        <HomeHeaderContainer>
            <header className="home-header">
                <h1>The Shoppies</h1>
                <p className="toggle" onClick={toggleTheme}>{currentTheme.id} Theme</p>
            </header>
        </HomeHeaderContainer>
    );
  };
  export default HomeHeader;