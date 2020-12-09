import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Movies } from '../components/Movies'
import { GET_MOVIES } from '../config/queries'

export const Home: React.FC = () => {
    const { loading, error, data } = useQuery(GET_MOVIES)
    console.log(data, 2222222222222)
    if(loading) return <h1>Loading</h1>
    if(error) return <h1>Error</h1>
    return (
        <Movies data={data} moviesdata={GET_MOVIES} />
    )
}