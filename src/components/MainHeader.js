import { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from "../providers/ThemeProvider"
import { Link } from 'react-router-dom';
import '../styles/components/MainHeader.css'

const MainHeaderContainer = styled.section`
    background-color: ${props => props.theme.bg.primary};
    color: ${props => props.theme.header.primary};
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