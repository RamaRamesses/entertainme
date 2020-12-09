import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import client from '../config/graphql';
import { GET_FAVOURITES } from '../config/queries';
import { useReactiveVar } from '@apollo/client'
import { Favourites as favCache} from '../config/cache'

export const Favourites = () => {
  const reactiveVar = useReactiveVar(favCache)
  const [favouritesCache, setFavourites] = useState([])
  useEffect(() => {
    const cache = client.readQuery({
      query: GET_FAVOURITES 
    })
    console.log(cache, 'cache')
    setFavourites(cache)
  }, [])

  if(!favouritesCache) return <h1>A</h1>
  return (
    <div className="container mt-4 bg-light p-5 main-bg mb-5">
      <div className="row d-flex mb-2">
        <div className="col-md-11">
          <h1 className="text-left ml-2">Favourites</h1>
        </div>
      </div>
      <div className="row">
        {
          reactiveVar.map(favourite => {
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={favourite.poster_path} />
                <Card.Body>
                  <Card.Title>{favourite.title}</Card.Title>
                  <Card.Text>
                    {favourite.overview}
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          })
        }
      </div>
      </div>
  )
}