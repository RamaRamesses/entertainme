import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import useHandleInputForm from '../helpers/useHandleInputForm'
import { ADD_MOVIE, ADD_SERIES, GET_MOVIES, GET_SERIES } from '../config/queries'
import { useHistory, useParams } from 'react-router-dom';

interface Input {
  title: string,
  overview: string,
  poster_path: string,
  popularity: number
}

interface ParamsType {
  category: string
}

interface Props {
  category: string,
  handleClose: () => void,
  input: Input,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const AddForm : React.FC = () => {
  const { input, handleInputChange } = useHandleInputForm();
  const { category } = useParams<ParamsType>();
  const [addMovie, { data: movieData } ] = useMutation(ADD_MOVIE)
  const [addSeries, { data: seriesData } ] = useMutation(ADD_SERIES)
  const history = useHistory();
  return (
    <div>
      <h1>{category}</h1>
      <form onSubmit={e => {
        e.preventDefault();
        console.log(input)
        input.popularity = Number(input.popularity)
        console.log(input)
        if(category === 'movies') {
          addMovie({
            variables: {
              movie: input
            },
            refetchQueries: [{
              query: GET_MOVIES
            }]
          })
        } else {
          addSeries({
            variables: {
              series: input
            },
            refetchQueries: [{
              query: GET_SERIES
            }]
          })
        }
        history.push(`/${category}`)
      }} >
      <div className="mb-3 text-left">
        <label htmlFor="title" className="form-label">Title</label>
        <input name="title" value={input.title} onChange={handleInputChange} type="text" className="form-control" id="title" required />
      </div>
      <div className="mb-3 text-left">
        <label htmlFor="overview" className="form-label">Overview</label>
        <input name="overview" value={input.overview} onChange={handleInputChange} className="form-control" id="overview" required />
      </div>
      <div className="mb-3 text-left">
        <label htmlFor="posterpath" className="form-label">Poster Path</label>
        <input name="poster_path" value={input.poster_path} onChange={handleInputChange} required type="text" className="form-control" id="posterpath" />
      </div>
      <div className="mb-3 text-left">
        <label htmlFor="popularity" className="form-label">Popularity</label>
        <input name="popularity" value={input.popularity} onChange={handleInputChange} required type="number" className="form-control" id="popularity" />
      </div>
      <button type="submit" className="btn btn-primary float-left">Submit</button>
      </form>
    </div>
  )
}