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

const Search = styled.span`
    border: 1px solid black;
`

const SearchBarTitle = styled.label`
    color: ${props => props.theme.header.primary};
`

const SearchBar = ({input, setInput, handleEvent}) => {
    return (
        <SearchBarContainer className="search-bar-container">
            <SearchBarInner className="search-bar-inner">
                <SearchBarTitle className="search-bar-title">Movie title</SearchBarTitle>
                <Search className="search"><img className="search-icon" src={"https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_search-64.png"} alt="search icon" onClick={handleEvent}/><input className="search-input" type="text" name="keyword" value={input} onChange={setInput} onKeyPress={handleEvent}/></Search>
            </SearchBarInner>
        </SearchBarContainer>
    );
  };
  export default SearchBar;