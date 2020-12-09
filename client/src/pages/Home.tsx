import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Movies } from '../components/Movies'
import { Switch, Route } from 'react-router-dom';
import { Series } from '../components/Series';

export const Home: React.FC = () => {
  return (
    <Switch>
      <Route path="/movies">
        <Movies />
      </Route>
      <Route path="/tvseries">
        <Series />
      </Route>
    </Switch>
  )
}