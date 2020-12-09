import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import client from '../config/graphql';
import { GET_FAVOURITES } from '../config/queries';

export const Favourites = () => {

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
      <h1>{favouritesCache.favourites}</h1>
      {
        // favouritesCache.map((favourite : any) => {
        //   return (
        //     <Card style={{ width: '18rem' }}>
        //       <Card.Img variant="top" src="holder.js/100px180" />
        //       <Card.Body>
        //         <Card.Title>{favourite.title}</Card.Title>
        //         <Card.Text>
        //           Some quick example text to build on the card title and make up the bulk of
        //           the card's content.
        //         </Card.Text>
        //         <Button variant="primary">Go somewhere</Button>
        //       </Card.Body>
        //     </Card>
        //   )
        // })
      }
      </div>
  )
}