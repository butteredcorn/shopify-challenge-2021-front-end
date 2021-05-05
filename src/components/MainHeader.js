import {useContext} from 'react'
import styled from 'styled-components'
import { ThemeContext } from "./ThemeProvider"
import { Link } from 'react-router-dom';
import '../styles/MainHeader.css'

const MainHeaderContainer = styled.section`
    background-color: ${props => props.theme.bg.primary};
    color: ${props => props.theme.text.tertiary};
    border: 1px solid ${props => props.theme.bg.primary};
`

const MainHeader = () => {
    const { currentTheme, dispatch } = useContext(ThemeContext);

    const toggleTheme = () => {
        dispatch({ type: "toggleTheme" });
    };

    return (
        <MainHeaderContainer>
            <header className="home-header">
                <h1><Link to="/" className="nav-link">The Shoppies</Link></h1>
                <p className="toggle" onClick={toggleTheme}>{currentTheme.id} Theme</p>
            </header>
        </MainHeaderContainer>
    );
  };
  export default MainHeader;