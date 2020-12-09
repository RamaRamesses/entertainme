import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Movies } from '../components/Movies'
import { Switch, Route } from 'react-router-dom';
import { Series } from '../components/Series';
import { AddForm } from '../components/AddForm';

export const Home: React.FC = () => {
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
    </Switch>
  )
}