import {gql} from '@apollo/client'

export const GET_MOVIES_BY_TITLE = gql`
    query SearchByTitle($title: String!) {
        searchByTitle(title: $title) {
                Search {
                    Title
                    Year
                    imdbID
                    Poster
                }
                totalResults
                Response
            }
    }
`