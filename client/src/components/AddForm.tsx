import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import useHandleInputForm from '../helpers/useHandleInputForm'
import { ADD_MOVIE, ADD_SERIES, GET_MOVIES, GET_SERIES } from '../config/queries'

interface Props {
  category: string
}

export const AddForm : React.FC<Props> = ({category}) => {
  const {input, handleInputChange} = useHandleInputForm()
  const [addMovie, { data: movieData } ] = useMutation(ADD_MOVIE)
  const [addSeries, { data: seriesData } ] = useMutation(ADD_SERIES)
  return (
    <div>
      <form>
      <div className="mb-3 text-left">
        <label htmlFor="title" className="form-label">Title</label>
        <input name="title" value={input.title} onChange={handleInputChange} type="text" className="form-control" id="title" />
      </div>
      <div className="mb-3 text-left">
        <label htmlFor="overview" className="form-label">Overview</label>
        <input name="overview" value={input.overview} onChange={handleInputChange} className="form-control" id="overview" />
      </div>
      <div className="mb-3 text-left">
        <label htmlFor="posterpath" className="form-label">Poster Path</label>
        <input name="poster_path" value={input.poster_path} onChange={handleInputChange} type="text" className="form-control" id="posterpath" />
      </div>
      <div className="mb-3 text-left">
        <label htmlFor="popularity" className="form-label">Popularity</label>
        <input name="popularity" value={input.popularity} onChange={handleInputChange} type="number" className="form-control" id="popularity" />
      </div>
      <button onClick={e => {
        e.preventDefault();
        input.popularity = Number(input.popularity)
        console.log(input)
        if(category === 'Movies') {
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
      }} type="submit" className="btn btn-primary float-left" data-dismiss="modal">Submit</button>
      </form>
    </div>
  )
}