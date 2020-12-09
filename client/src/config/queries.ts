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

export const UPDATE_MOVIE = gql`
  mutation UPDATE_MOVIE($movie: updateMovie) {
    updateMovie(movie: $movie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_SERIES = gql`
  query GET_SERIES {
    allseries {
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`