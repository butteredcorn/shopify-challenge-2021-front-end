import { Link } from 'react-router-dom';

import styled from 'styled-components'

import '../styles/NominationsList.css'

import Error from './Error'

const NominationsContainer = styled.div`
    background-color: ${props => props.theme.bg.secondary};
    color: ${props => props.theme.text.tertiary};
    border: 1px solid ${props => props.theme.bg.primary};
`

const NominationsList = ({loading, error, data, remove}) => {


    if (loading) return null;
    if (error) {
        console.log(error.message)
        return (
            <NominationsContainer className="container">
                <div>
                    <h3 className="heading">Nominations</h3>
                    <Error message={error.message}/>
                </div>
            </NominationsContainer>
        )
    }

    return (
        <NominationsContainer className="container">
            <div>
                <h3 className="heading">Nominations</h3>
                {data && data.length > 0 && 
                <ul className="nominations">
                    {data.map((nomination) => 
                    <li className="nomination" key={nomination.imdbID}><Link to={{pathname: "/movie", state: {id: nomination.imdbID}}}>{nomination.Title}</Link> <span>({nomination.Year})</span> <span><button onClick={() => remove(nomination.imdbID)}>Remove</button></span></li>
                    )}
                </ul>}
                {data && data.length === 0 &&
                <p>No Nominations Yet! Nominate some movies to get started.</p>}
            </div>
        </NominationsContainer>
    )
}

export default NominationsList;