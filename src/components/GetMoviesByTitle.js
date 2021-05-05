import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../styles/GetMoviesByTitle.css'
import styled from 'styled-components'

import Error from './Error'

const MoviesContainer = styled.div`
    background-color: ${props => props.theme.bg.secondary};
    color: ${props => props.theme.text.tertiary};
    border: 1px solid ${props => props.theme.bg.primary};
`

const GetMoviesByTitle = ({keyword, loading, error, data, nominate}) => {

    if (loading) return null;

    if (error) {
        console.log(error.message)
        return (
            <MoviesContainer className="container">
                <div>
                    <h3 className="heading">Results</h3>
                    <Error message={error.message}/>
                </div>
            </MoviesContainer>
        )
    }

    return (
        <MoviesContainer className="container">
            {data && data.length > 0 && <div>
                {data.length > 1 ? <h3 className="heading">{data.length} Results for "{keyword}"</h3> : <h3 className="heading">{data.length} Result for "{keyword}"</h3>}
                <ul className="movies">
                {data.map((movie) => 
                    <li className="movie" key={movie.imdbID}><Link to={{pathname: "/movie", state: {id: movie.imdbID}}}>{movie.Title}</Link> <span>({movie.Year})</span> <span><button onClick={() => nominate({Title: movie.Title, Year: movie.Year, imdbID: movie.imdbID})}>Nominate</button></span></li>
                )}
                </ul>
            </div>}
            {data && data.length === 0 && <div>
                <h3 className="heading">Results</h3>
                <p>Movie results will show here after you search.</p>
            </div>}
        </MoviesContainer>
    )
}

export default GetMoviesByTitle;