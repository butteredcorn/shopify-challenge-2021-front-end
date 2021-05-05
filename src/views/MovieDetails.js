import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from "@apollo/client"
import { GET_MOVIE_BY_ID } from '../graphql/Queries'

import '../styles/MovieDetails.css'

import MainHeader from '../components/MainHeader'
import GetMoviesByID from '../components/GetMovieByID';

const MovieDetailsContainer = styled.section`
    background-color: ${props => props.theme.bg.primary};
    color: ${props => props.theme.text.tertiary};
    border: 1px solid ${props => props.theme.bg.primary};
`
const MainSection = styled.section`
    background-color: ${props => props.theme.bg.primary};
    color: ${props => props.theme.text.tertiary};
    border: 1px solid ${props => props.theme.bg.primary};
`

const MovieDetails = ({addNomination, removeNomination}) => {
    const location = useLocation()
    const id = location.state.id
    const { error, loading, data } = useQuery(GET_MOVIE_BY_ID, {variables: {id: id}});    
    const [movie, setMovie] = useState({})
    const [err, setErr] = useState(null)

    useEffect(() => {
        if (data && data.movieByID) setMovie(data.movieByID)
    }, [data])

    useEffect(() => {
        if (error) setErr(error)
    }, [error, err])

    return (
        <MovieDetailsContainer className="movie-details-container">
            <MainHeader/>
            <MainSection className="main-section">
                <GetMoviesByID error={err} setError={setErr} loading={loading} movie={movie} nominate={addNomination} remove={removeNomination}/>
            </MainSection>
        </MovieDetailsContainer>
    );
  };
  export default MovieDetails;