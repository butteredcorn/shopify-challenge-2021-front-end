import styled from 'styled-components'
import '../styles/SearchBar.css'

const SearchBarContainer = styled.section`
    background-color: ${props => props.theme.bg.secondary};
    color: ${props => props.theme.text.tertiary};
    border: 1px solid ${props => props.theme.bg.primary};
    `

const SearchBar = ({keyword, setKeyword, onEnter}) => {
    return (
        <SearchBarContainer className="SearchBarContainer">
            <p>Movie title</p>
            <input className="SearchBar" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyPress={(e) => onEnter(e.key)}/>
        </SearchBarContainer>
    );
  };
  export default SearchBar;