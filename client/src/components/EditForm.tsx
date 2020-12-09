import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import useHandleInputForm from '../helpers/useHandleInputForm'
import { ADD_MOVIE, GET_MOVIES, UPDATE_MOVIE } from '../config/queries'

interface Input {
  title: string,
  overview: string,
  poster_path: string,
  popularity: number
}

interface Props {
    input: Input,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const EditForm : React.FC<Props> = ({input, handleInputChange}) => {
  const [editMovie, { data } ] = useMutation(UPDATE_MOVIE)
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
        editMovie({
          variables: {
            movie: input
          },
          refetchQueries: [{
            query: GET_MOVIES
          }]
        })
      }} type="submit" className="btn btn-primary float-left" data-dismiss="modal">Submit</button>
      </form>
    </div>
  )
}