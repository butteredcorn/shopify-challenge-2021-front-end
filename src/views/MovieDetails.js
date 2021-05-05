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

const MovieDetails = () => {
    const location = useLocation()
    const id = location.state.id
    const { error, loading, data } = useQuery(GET_MOVIE_BY_ID, {variables: {id: id}});    
    const [movie, setMovie] = useState({})
    const [nominations, setNominations] = useState([])

    const addNomination = (nomination)  => {
        if (nominations && nominations.filter(n => n.imdbID === nomination.imdbID).length > 0) return;
        const updatedNominations = [...nominations, nomination]
        setNominations(updatedNominations)
        localStorage.setItem("nominations", JSON.stringify(updatedNominations))
    }

    const removeNomination = (id) => {
        const updatedNominations = nominations.filter(n => n.imdbID !== id)
        setNominations(updatedNominations)
        localStorage.setItem("nominations", JSON.stringify(updatedNominations))
    }

    useEffect(() => {
        if (data && data.movieByID) setMovie(data.movieByID)
    }, [data])

    useEffect(() => {
        const nominations = JSON.parse(localStorage.getItem("nominations"))
        setNominations(nominations)
    }, [])

    // useEffect(() => {
    //     localStorage.setItem("nominations", JSON.stringify(nominations))
    // }, [nominations])

    

    return (
        <MovieDetailsContainer className="movie-details-container">
            <MainHeader/>
            <MainSection className="main-section">
                <GetMoviesByID error={error} loading={loading} movie={movie} nominate={addNomination} remove={removeNomination}/>
            </MainSection>
        </MovieDetailsContainer>
    );
  };
  export default MovieDetails;