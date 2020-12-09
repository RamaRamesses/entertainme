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
    allSeries {
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`

export const ADD_SERIES = gql`
mutation ADD_SERIES ($series: seriesInput) {
  addSeries(series: $series) {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const DELETE_SERIES = gql`
  mutation DELETE_SERIES ($id: String!) {
    deleteSeries(id: $id) {
      _id
    }
  }
`

export const UPDATE_SERIES = gql`
  mutation UPDATE_SERIES ($series: seriesUpdate) {
    updateSeries(series: $series) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const ADD_SERIES_TAG = gql`
  mutation addSeriesTag($series: seriesTag) {
    addSeriesTag(series: $series) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const ADD_MOVIES_TAG = gql`
  mutation addMovieTag($movie: addTag) {
    addMovieTag(movie: $movie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_MOVIE_BY_ID = gql`
  query GET_MOVIE_BY_ID($id: String!) {
    movie(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_SERIES_BY_ID = gql`
  query GET_SERIES_BY_ID($id: String!) {
    series(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`