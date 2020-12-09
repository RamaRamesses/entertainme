import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Movies } from '../components/Movies'
import { GET_MOVIES, GET_SERIES } from '../config/queries'
import { Switch, Route } from 'react-router-dom';

export const Home: React.FC = () => {
  const { loading, error, data } = useQuery(GET_MOVIES)
  if(loading) return <h1>Loading</h1>
  if(error) return <h1>Error</h1>
  return (
    <Switch>
      <Route path="/movies">
        <Movies data={data} moviesdata={GET_MOVIES} />
      </Route>
    </Switch>
  )
}