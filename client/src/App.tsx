import React from 'react';
import './App.css';
import {Home} from './pages/Home'
import { Header } from './components/Header'
import { ApolloProvider } from '@apollo/client';
import client from './config/graphql';

const App: React.FC = () => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Header />
        <Home />
      </ApolloProvider>
    </div>
  );
}

export default App;
