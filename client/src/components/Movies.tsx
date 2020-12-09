import { ApolloQueryResult, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import {AddForm} from './AddForm'
import { DELETE_MOVIE, GET_MOVIES } from '../config/queries'

interface MoviesObj {
  _id: String,
  title: String,
  overview: String,
  poster_path: String,
  popularity: Number,
  tags: [String]
}

interface Movies {
  movies: MoviesObj[]
}

interface Props {
  data: Movies,
  moviesdata: any
}

export const Movies : React.FC<Props> = ({data, moviesdata}) => {
    const [deleteMovie, {data : res}] = useMutation(DELETE_MOVIE)
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

    return (
      <div className="container mt-4">
        <div className="row d-flex mb-2">
          <div className="col-md-11">
            <h1 className="text-left ml-2">Movies</h1>
          </div>
          <div className="col-md-1">
            <button className="btn btn-lg text-white bg-info" data-toggle="modal" data-target="#exampleModal">+</button>
            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" 
            aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <AddForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          data.movies.map((movie : MoviesObj, i : Number) => {
            return (
            <div key={i.toString()} className="card content mx-1 mt-0 border-0" style={{width: '100%', height: '15rem'}}>
              <div className="card-body p-0 d-flex">
                <div className="row">
                  <div className="col-md-1 pt-4 pl-4 mr-3">
                    <img height="125rem" src="https://raw.githubusercontent.com/alexZajac/react-native-skeleton-content/master/demos/main.gif"></img>
                  </div>
                  <div className="col-md-8 m-0 text-left pl-4">
                    <div className="row">
                      <h2 className="card-title m-0 mt-3 ml-2 mb-1">{movie.title}</h2>
                      <p className="text-right ml-auto card-text mt-3">{movie.popularity}</p>
                    </div>
                    <p className="card-text m-0">{movie.poster_path}</p>
                    <div className="row card-text m-0">
                      {
                        movie.tags.map((tag: String) => {
                          return <p className="m-0"><span className="badge bg-secondary">{tag}</span></p>
                        })
                      }
                      <p className="card-text m-0">{movie.overview}</p>
                    </div>
                  </div>
                  <div className="col-md-2 justify-content-end">
                    <img className="img-responsive" src="https://hackathonthailand.com/images/default-thumbnail.gif" style={{objectFit: 'cover', width: '150%', height: '100%'}}></img>
                  </div>
                </div>
                  <button onClick={(e) => handleDeleteButton(movie._id, e)} className="btn btn-danger">Delete</button>
              </div>
            </div>)
          })
        }  
      </div>)
}