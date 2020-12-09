import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Movies } from '../components/Movies'
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { Series } from '../components/Series';
import { AddForm } from '../components/AddForm';
import { MovieDetail } from './MovieDetail';
import { SeriesDetail } from './SeriesDetail';


export const Home: React.FC = () => {
  const history = useHistory();
  return (
    <Switch>
      <Route exact path="/movies">
        <Movies />
      </Route>
      <Route exact path="/tvseries">
        <Series />
      </Route>
      <Route path="/:category/add">
        <AddForm />
      </Route>
      <Route path="/movies/:id">
        <MovieDetail />
      </Route>
      <Route path="/tvseries/:id">
        <SeriesDetail />
      </Route>
      <Route path="/">
        <Redirect to="/movies" />
      </Route>
    </Switch>
  )
}