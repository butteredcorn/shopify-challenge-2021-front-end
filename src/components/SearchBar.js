import styled from 'styled-components'
import '../styles/SearchBar.css'

const SearchBarContainer = styled.section`
    background-color: ${props => props.theme.bg.primary};
    color: ${props => props.theme.text.tertiary};
    border: 1px solid ${props => props.theme.bg.primary};
    `

const SearchBarInner = styled.section`
    background-color: ${props => props.theme.bg.secondary};
    color: ${props => props.theme.text.tertiary};
    border: 1px solid ${props => props.theme.bg.primary};
    `

const SearchBarTitle = styled.label`
    color: ${props => props.theme.header.primary};
`

const SearchBar = ({keyword, setKeyword, onEnter}) => {
    return (
        <SearchBarContainer className="search-bar-container">
            <SearchBarInner className="search-bar-inner">
                <SearchBarTitle className="search-bar-title">Movie title</SearchBarTitle>
                <input className="search-input" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyPress={(e) => onEnter(e.key)}/>
            </SearchBarInner>
        </SearchBarContainer>
    );
  };
  export default SearchBar;