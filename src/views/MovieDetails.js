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
    const [err, setErr] = useState(null)

    const addNomination = (nomination)  => {
        if (err) setErr(null)
        if (nominations.length >= process.env.REACT_APP_MAX_NOMINATIOINS) return setErr(new Error(`You can only nominate ${process.env.REACT_APP_MAX_NOMINATIOINS} movies.`))
        if (nominations && nominations.filter(n => n.imdbID === nomination.imdbID).length > 0) return;
        const updatedNominations = [...nominations, nomination]
        setNominations(updatedNominations)
        localStorage.setItem("nominations", JSON.stringify(updatedNominations))
    }

    const removeNomination = (id) => {
        if (err) setErr(null)
        const updatedNominations = nominations.filter(n => n.imdbID !== id)
        setNominations(updatedNominations)
        localStorage.setItem("nominations", JSON.stringify(updatedNominations))
    }

    useEffect(() => {
        if (data && data.movieByID) setMovie(data.movieByID)
    }, [data])

    useEffect(() => {
        if (error) setErr(error)
    }, [error, err])

    useEffect(() => {
        const nominations = JSON.parse(localStorage.getItem("nominations"))
        setNominations(nominations)
    }, [])

    return (
        <MovieDetailsContainer className="movie-details-container">
            <MainHeader/>
            <MainSection className="main-section">
                <GetMoviesByID error={err} loading={loading} movie={movie} nominate={addNomination} remove={removeNomination}/>
            </MainSection>
        </MovieDetailsContainer>
    );
  };
  export default MovieDetails;