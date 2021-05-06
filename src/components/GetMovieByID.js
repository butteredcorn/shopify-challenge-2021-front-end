import { useState, useEffect } from 'react'
import styled from 'styled-components'

import '../styles/components/GetMovieByID.css'

import Error from './Error'

const MovieContainer = styled.div`
    background-color: ${props => props.theme.bg.secondary};
    color: ${props => props.theme.text.secondary};
    border: 1px solid ${props => props.theme.bg.primary};
`

const MovieTitle = styled.h2`
    color: ${props => props.theme.header.primary};
`

const GetMoviesByID = ({error, setError, loading, movie, nominate, remove}) => {
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

    if (loading) return <MovieContainer className="movie-container"><p>Loading ...</p></MovieContainer>;;
    if (error) {
        console.log(error.message)
        return (
            <MovieContainer className="movie-container">
                <div>
                    <Error message={error.message}/>
                </div>
            </MovieContainer>
        )
    }

    return (
        <MovieContainer className="movie-container">
            {movie && 
            <div>
                <MovieTitle className="movie-title">{movie.Title} ({movie.Year})</MovieTitle>
                <div className="movie-detail-container">
                    <div className="poster-container">
                        <img className="poster" src={movie.Poster} alt="movie poster"/>
                    </div>
                    <div className="movie-details">
                        {/* could put the following into an array of objects and map through them */}
                        <span><strong>Genre:</strong> {movie.Genre}</span>
                        <span><strong>Rated:</strong> {movie.Rated}</span>
                        <span><strong>Runtime:</strong> {movie.Runtime}</span>
                        <span><strong>Director:</strong> {movie.Director}</span>
                        <span><strong>Actors:</strong> {movie.Actors}</span>
                        <span><strong>Language:</strong> {movie.Language}</span>
                        <span><strong>Metascore:</strong> {movie.Metascore}</span>
                        <span><strong>IMDB Rating:</strong> {movie.imdbRating}</span>
                        {!nominated && <span><button onClick={() => { 
                            nominate({Title: movie.Title, Year: movie.Year, imdbID: movie.imdbID}, error, setError) 
                            setNominated(true)
                        }}>Nominate</button></span>}
                        {nominated && <span><button onClick={() => { 
                            remove(movie.imdbID, error, setError) 
                            setNominated(false)
                        }}>Remove</button></span>}
                    </div>
                </div>
            </div>}
        </MovieContainer>
    )
}

export default GetMoviesByID;