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

export const GET_MOVIE_BY_ID = gql`
    query movieByID($id: String!) {
        movieByID(id: $id) {
            Title
            Year
            Genre
            Poster
            Rated
            Runtime
            Director
            Actors
            Language
            Metascore
            imdbRating
            imdbID
        }
    }
`