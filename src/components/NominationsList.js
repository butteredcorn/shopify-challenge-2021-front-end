import { Link } from 'react-router-dom';

import styled from 'styled-components'

import '../styles/components/NominationsList.css'

import Error from './Error'

const NominationsContainer = styled.div`
    background-color: ${props => props.theme.bg.secondary};
    color: ${props => props.theme.text.secondary};
    border: 1px solid ${props => props.theme.bg.primary};
`

const SubHeader = styled.h3`
    color: ${props => props.theme.header.primary};
`

const NominationsList = ({loading, error, setError, data, remove}) => {


    if (loading) return null;
    if (error) {
        console.log(error.message)
        return (
            <NominationsContainer className="nominations-container">
                <div>
                    <SubHeader className="heading">Nominations</SubHeader>
                    <Error message={error.message}/>
                </div>
            </NominationsContainer>
        )
    }

    return (
        <NominationsContainer className="nominations-container">
            {/* <div> */}
                <SubHeader className="heading">Nominations</SubHeader>
                {data && data.length > 0 && 
                <ul className="nominations">
                    {data.map((nomination) => 
                    <li className="nomination" key={nomination.imdbID}><Link to={{pathname: "/movie", state: {id: nomination.imdbID}}}>{nomination.Title}</Link> <span>({nomination.Year})</span> <span><button onClick={() => remove(nomination.imdbID, error, setError)}>Remove</button></span></li>
                    )}
                </ul>}
                {data && data.length === 0 &&
                <p>No Nominations Yet! Nominate some movies to get started.</p>}
            {/* </div> */}
        </NominationsContainer>
    )
}

export default NominationsList;