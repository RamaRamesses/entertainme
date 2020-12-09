import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_MOVIE_BY_ID, GET_SERIES_BY_ID } from '../config/queries';

interface Props {
  data: any
}

interface ParamsType {
  id: string,
  category: string
}

export const SeriesDetail : React.FC = () => {
  const { id } = useParams<ParamsType>();
  const { loading, error, data } = useQuery(GET_SERIES_BY_ID, {
    variables: { 
      id
    }
  })

  if(loading) return <h1>Loading</h1>
  if(error) return <h1>Error</h1>
  console.log(data)
  const dataRes = data.series
  return (
    <div className="d-flex justify-content-center mb-4 mt-5">
      <div className="card" style={{ width: "75rem", height: "25rem", border: 0, borderRadius: '15px' }}>
        <div className="d-flex justify-content-left g-0">
          <div className="">
            <img src={dataRes.poster_path} style={{ 
            height: "25rem", width: '20.68375rem', objectPosition: '0% 0%', borderRadius: '15px'}} alt="..." />
          </div>
          <div className="m-0">
            <div className="card-body border-0">
              <div className="text-left">
                <div className="row">
                  <h2 className="card-title mb-3 ml-3" style={{fontFamily: 'Gugi, cursive', color: 'black'}}>{dataRes.title}</h2>
                  <p className="card-text mr-3 ml-auto">{dataRes.popularity}</p>
                </div>
                <p className="card-text">{dataRes.overview}</p>
                <div className="row mb-5 ml-1">
                  {
                    dataRes.tags.map((tag: String) => {
                      return <p className="m-0"><span className="badge bg-info text-light mr-1">{tag}</span></p>
                    })
                  }
                </div>
                <button type="button" className="btn btn-danger btn-lg">Back</button>
                {/* <p className="card-text"><span style={{color: 'black'}}>Homeworld: </span>{character.homeworld}</p>
                <p className="card-text"><span style={{color: 'black'}}>Species: </span>{character.species}</p>
                <p className="card-text"><span style={{color: 'black'}}>Height: </span>{character.height}</p>
                <p className="card-text"><span style={{color: 'black'}}>Gender: </span>{character.gender}</p>
                <a href={character.wiki}><button type="button" className="btn btn-info">Wookiepedia</button></a> */}
              </div>
            </div>
          </div>
        </div>
        {/* <button type="button" onClick={handleFavoriteButton} className="btn btn-primary form-control m-0">{favIndex == 1 ? 'Remove from favourites' : 'Add to favourites'}</button> */}
      </div>
    </div>
  )
}