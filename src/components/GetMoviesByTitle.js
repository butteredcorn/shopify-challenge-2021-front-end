import { Link } from 'react-router-dom';
import styled from 'styled-components'

import '../styles/components/GetMoviesByTitle.css'

import Error from './Error'

const MoviesContainer = styled.div`
    background-color: ${props => props.theme.bg.secondary};
    color: ${props => props.theme.text.secondary};
    border: 1px solid ${props => props.theme.bg.primary};
`

const SubHeader = styled.h3`
    color: ${props => props.theme.header.primary};
`

const GetMoviesByTitle = ({keyword, loading, error, setError, data, nominate, nominations}) => {

    const nominated = (id) => {
        const nomination = nominations.filter(n => n.imdbID === id)
        if (nomination.length > 0) return true
        return false
    }

    if (loading) return <MoviesContainer className="movies-container"><p>Loading ...</p></MoviesContainer>;
    if (error) {
        console.log(error.message)
        return (
            <MoviesContainer className="movies-container">
                <div>
                    <SubHeader className="heading">Results</SubHeader>
                    <Error message={error.message}/>
                </div>
            </MoviesContainer>
        )
    }

    return (
        <MoviesContainer className="movies-container">
            {data && data.length > 0 && <div className="movies-container-inner">
                {data.length > 1 ? <SubHeader className="heading">{data.length} Results for "{keyword}"</SubHeader> : <SubHeader className="heading">{data.length} Result for "{keyword}"</SubHeader>}
                <ul className="movies">
                {data.map((movie) => 
                    <li className="movie" key={movie.imdbID}><Link to={{pathname: "/movie", state: {id: movie.imdbID}}}>{movie.Title}</Link> <span>({movie.Year})</span> <span>{movie.imdbID && !nominated(movie.imdbID) && <button onClick={() => nominate({Title: movie.Title, Year: movie.Year, imdbID: movie.imdbID}, error, setError)}>Nominate</button>}</span></li>
                )}
                </ul>
            </div>}
            {data && data.length === 0 && <div>
                <SubHeader className="heading">Results</SubHeader>
                <p>Movie results will show here after you search.</p>
            </div>}
        </MoviesContainer>
    )
}

export default GetMoviesByTitle;