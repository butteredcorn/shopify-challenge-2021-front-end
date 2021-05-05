import { useState, useEffect } from 'react'
import '../styles/GetMovieByID.css'
import styled from 'styled-components'

const MovieContainer = styled.div`
    background-color: ${props => props.theme.bg.secondary};
    color: ${props => props.theme.text.tertiary};
    border: 1px solid ${props => props.theme.bg.primary};
`

const GetMoviesByID = ({error, loading, movie, nominate, remove}) => {
    const [nominated, setNominated] = useState(false)

    useEffect(() => {
        if (movie.imdbID) {
            const nomination = JSON.parse(localStorage.getItem("nominations")).filter(n => n.imdbID === movie.imdbID)
            if (nomination.length > 0) {
                setNominated(true)
            } else {
                setNominated(false)
            }
        }
    }, [movie.imdbID])

    if (loading) return null;
    if (error) return `${error}.`;

    return (
        <MovieContainer className="container">
            {movie && 
            <div>
                <h2 className="movie-title">{movie.Title} ({movie.Year})</h2>
                <div className="movie-container">
                    <div>
                        <img className="poster" src={movie.Poster} alt="movie poster"/>
                    </div>
                    <div className="movie-details">
                        <span><strong>Genre:</strong> {movie.Genre}</span>
                        <span><strong>Rated:</strong> {movie.Rated}</span>
                        <span><strong>Runtime:</strong> {movie.Runtime}</span>
                        <span><strong>Director:</strong> {movie.Director}</span>
                        <span><strong>Actors:</strong> {movie.Actors}</span>
                        <span><strong>Language:</strong> {movie.Language}</span>
                        <span><strong>Metascore:</strong> {movie.Metascore}</span>
                        <span><strong>IMDB Rating:</strong> {movie.imdbRating}</span>
                        {!nominated && <span><button onClick={() => { 
                            nominate({Title: movie.Title, Year: movie.Year, imdbID: movie.imdbID}) 
                            setNominated(true)
                        }}>Nominate</button></span>}
                        {nominated && <span><button onClick={() => { 
                            remove(movie.imdbID) 
                            setNominated(false)
                        }}>Remove</button></span>}
                    </div>
                </div>
            </div>}
        </MovieContainer>
    )
}

export default GetMoviesByID;