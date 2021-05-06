import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useLazyQuery } from "@apollo/client"
import { GET_MOVIES_BY_TITLE } from '../graphql/Queries'


import '../styles/views/Home.css'

import MainHeader from '../components/MainHeader'
import SearchBar from '../components/SearchBar'
import GetMoviesByTitle from '../components/GetMoviesByTitle'
import NominationsList from '../components/NominationsList'
import FinishedBanner from '../components/FinishedBanner'

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

const Home = ({nominations, addNomination, removeNomination}) => {
    const [input, setInput] = useState({keyword: "", searchTerm: ""})
    const [getMoviesByTitle, { error, loading, data }] = useLazyQuery(GET_MOVIES_BY_TITLE);    
    const [movies, setMovies] = useState([])
    const [err, setErr] = useState(null)

    const handleUserInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const handleEvent = (e) => {
        if(err) setErr(null)
        if (e.key === "Enter" || e.type === "click") {
            setInput({...input, searchTerm: input.keyword})
            getMoviesByTitle({variables: {title: input.keyword}})
        } 
    }

    useEffect(() => {
        if (data && data.searchByTitle && data.searchByTitle.Search) {
            console.log(data.searchByTitle.Search)
            //note: if no match is found for keyword, server will throw error
            return setMovies(data.searchByTitle.Search)
        }
    }, [data])

    useEffect(() => {
        if (error) setErr(error)
    }, [error, err])

    return (
        <HomeContainer className="home-container">
            <MainHeader/>
            {nominations.length >= process.env.REACT_APP_MAX_NOMINATIOINS && <FinishedBanner/>}
            <SearchBar input={input.keyword} setInput={handleUserInput} handleEvent={handleEvent}/>
            <MainSection className="home-main-section">
                <GetMoviesByTitle keyword={input.searchTerm} loading={loading} error={err} setError={setErr} data={movies} nominate={addNomination} nominations={nominations}/>
                <NominationsList data={nominations} remove={removeNomination} error={err} setError={setErr} />
            </MainSection>
        </HomeContainer>
    );
  };
  export default Home;