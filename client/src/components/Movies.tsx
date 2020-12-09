import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import {AddForm} from './AddForm'
import {EditForm} from './EditForm'
import { DELETE_MOVIE, GET_MOVIES, UPDATE_MOVIE } from '../config/queries'
import useHandleInputForm from '../helpers/useHandleInputForm';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Movie } from './Movie';
import { Route, Switch, useHistory } from 'react-router-dom';

interface MoviesObj {
  _id: String,
  title: String,
  overview: String,
  poster_path: String,
  popularity: Number,
  tags: [String]
}

export const Movies : React.FC = () => {
    const { loading, error, data } = useQuery(GET_MOVIES)
    const [deleteMovie, {data : res}] = useMutation(DELETE_MOVIE)
    const [updateMovie, {data : updateRes }] = useMutation(UPDATE_MOVIE)
    const { handleInputChange, input, setInput } = useHandleInputForm();
    function handleDeleteButton(id: any, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault();
      deleteMovie({
        variables: {
          id
        },
        refetchQueries: [{
          query: GET_MOVIES
        }]
      })
    }

    function handleUpdateButton( obj: any) {
      const payload = {
        id: obj._id,
        title: obj.title,
        overview: obj.overview,
        poster_path: obj.poster_path,
        popularity: obj.popularity
      }
      setInput(payload)
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useHistory();
    if(loading) return <h1>Loading</h1>
    if(error) return <h1>Error</h1>
    return (
      <div className="container mt-4">
        <div className="row d-flex mb-2">
          <div className="col-md-11">
            <h1 className="text-left ml-2">Movies</h1>
          </div>
          <div className="col-md-1">
            <button className="btn btn-lg text-white bg-info" onClick={() => history.push('/movies/add')}>+</button>
          </div>
        </div>
        {
          data.movies.map((movie : MoviesObj, i : Number) => {
            return <Movie i={i} handleDeleteButton={handleDeleteButton} 
            handleUpdateButton={handleUpdateButton} movie={movie} handleInputChange={handleInputChange} input={input} /> 
          })
        }  
      </div>)
}