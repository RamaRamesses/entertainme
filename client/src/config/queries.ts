import { gql } from '@apollo/client'

export const GET_MOVIES = gql`
  query GET_MOVIES {
    movies {
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation ADD_MOVIE($movie: movieInput) {
    addMovie(movie: $movie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation DELETE_MOVIE($id: String!) {
    deleteMovie(id: $id) {
      _id
    }
  }
`