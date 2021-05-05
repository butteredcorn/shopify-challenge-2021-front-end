import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../styles/GetMoviesByTitle.css'
import styled from 'styled-components'

const MoviesContainer = styled.div`
    background-color: ${props => props.theme.bg.secondary};
    color: ${props => props.theme.text.tertiary};
    border: 1px solid ${props => props.theme.bg.primary};
`

const GetMoviesByTitle = ({keyword, loading, error, data, nominate, nominations}) => {

    useEffect(() => {
        console.log(data)
    })

    if (loading) return null;
    if (error) return `${error}.`;

    return (
        <MoviesContainer className="container">
            {data && data.length > 0 && <div>
                <h3 className="heading">Results for "{keyword}"</h3>
                <ul className="movies">
                {data.map((movie) => 
                    <li className="movie" key={movie.imdbID}><span>{movie.Title}</span> <span>({movie.Year})</span> <span><button onClick={() => nominate({Title: movie.Title, Year: movie.Year, imdbID: movie.imdbID})}>Nominate</button></span> <span><button><Link to={{pathname: "/movie", state: {id: movie.imdbID}}}>View Details</Link></button></span></li>
                )}
                </ul>
            </div>}
            {data && data.length == 0 && <div>
                <h3 className="heading">Results</h3>
                <p>Movie results will show here after you search.</p>
            </div>}
        </MoviesContainer>
    )
}

export default GetMoviesByTitle;