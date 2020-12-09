import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_FAVOURITES, GET_MOVIES } from './queries';

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache()
});

client.writeQuery({
  query: GET_FAVOURITES,
  data: {
    favourites: [
      {
        __typename: 'Movie',
        _id: '5fd0b90772452f27b47b302d',
        overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio praesentium                       cupiditate officia ut quasi culpa inventore dolorem, obcaecati fugit illo adipisci, quos assumenda cum quas',
        popularity: 55,
        title: 'The OuterSphere',
        poster_path: 'https://upload.wikimedia.org/wikipedia/en/3/3c/Star_Trek_Discovery_season_2_poster.jpg',
        tags: []
      }
    ]
  }
})

export default client;