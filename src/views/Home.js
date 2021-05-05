import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useLazyQuery } from "@apollo/client"
import { GET_MOVIES_BY_TITLE } from '../graphql/Queries'


import '../styles/Home.css'

import MainHeader from '../components/MainHeader'
import SearchBar from '../components/SearchBar'
import GetMoviesByTitle from '../components/GetMoviesByTitle'
import NominationsList from '../components/NominationsList'

const HomeContainer = styled.section`
    background-color: ${props => props.theme.bg.primary};
    color: ${props => props.theme.text.tertiary};
    border: 1px solid ${props => props.theme.bg.primary};
`
const MainSection = styled.section`
    background-color: ${props => props.theme.bg.primary};
    color: ${props => props.theme.text.tertiary};
    border: 1px solid ${props => props.theme.bg.primary};
`

const Home = () => {
    const [keyword, setKeyword] = useState("")
    const [getMoviesByTitle, { error, loading, data }] = useLazyQuery(GET_MOVIES_BY_TITLE);    
    const [movies, setMovies] = useState([])
    const [nominations, setNominations] = useState([])

    useEffect(() => {
        if (data && data.searchByTitle && data.searchByTitle.Search) {
            console.log(data.searchByTitle.Search)
            if (data.searchByTitle.Search.length > 0) setMovies(data.searchByTitle.Search)
            //else no matching movies and render empty search result message
        }
    }, [data])

    const handleEnter = (key) => {
        if (key && key === "Enter") getMoviesByTitle({variables: {title: keyword}})
    }

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
        const nominations = JSON.parse(localStorage.getItem("nominations"))
        setNominations(nominations)
    }, [])

    // useEffect(() => {
    //     localStorage.setItem("nominations", JSON.stringify(nominations))
    // }, [nominations])

    return (
        <HomeContainer className="home-container">
            <MainHeader/>
            <SearchBar keyword={keyword} setKeyword={setKeyword} onEnter={handleEnter}/>
            <MainSection className="main-section">
                <GetMoviesByTitle keyword={keyword} loading={loading} error={error} data={movies} nominate={addNomination} nominations={nominations}/>
                <NominationsList data={nominations} remove={removeNomination}/>
            </MainSection>
        </HomeContainer>
    );
  };
  export default Home;