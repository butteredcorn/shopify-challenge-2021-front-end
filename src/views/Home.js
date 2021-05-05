import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useLazyQuery } from "@apollo/client"
import { GET_MOVIES_BY_TITLE } from '../graphql/Queries'


import '../styles/Home.css'

import HomeHeader from '../components/HomeHeader'
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

    useEffect(() => {
        console.log(keyword)
    }, [keyword])

    return (
        <HomeContainer className="home-container">
            <HomeHeader/>
            <SearchBar keyword={keyword} setKeyword={setKeyword} onEnter={handleEnter}/>
            <MainSection className="main-section">
                <GetMoviesByTitle keyword={keyword} loading={loading} error={error} data={movies} nominate={setNominations} nominations={nominations}/>
                <NominationsList data={nominations}/>
            </MainSection>
        </HomeContainer>
    );
  };
  export default Home;