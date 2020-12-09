import React from 'react';
import './App.css';
import {Home} from './pages/Home'
import { Header } from './components/Header'
import { ApolloProvider } from '@apollo/client';
import client from './config/graphql';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <Home />
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
