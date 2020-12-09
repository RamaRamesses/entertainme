import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { EditForm } from './EditForm';
import { useHistory, useRouteMatch, Route, Switch } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { ADD_MOVIES_TAG, GET_MOVIES } from '../config/queries';


interface Props {
  movie: any,
  handleUpdateButton: any,
  i: any,
  handleDeleteButton: any,
  handleInputChange: any,
  input: any
}

export const Movie : React.FC<Props> = ({movie, handleUpdateButton, handleDeleteButton, i, handleInputChange, input}) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let { path, url } = useRouteMatch();
  const [tag, setTag] = useState('')
  const [addTag, {data: tagData}] = useMutation(ADD_MOVIES_TAG)
  function handleTagButton(id: any, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    addTag({
      variables: {
        movie: {
          id,
          tag
        }
      },
      refetchQueries: [{
        query: GET_MOVIES
      }]
    })
  }

  return (
    // <div className="col-md-2">
    //   <div className="card p-0 mb-4" style={{border: '0', maxHeight: '16rem'}}>
    //     <img className="card-img-top" src={movie.poster_path} style={{height: '18rem', objectPosition: '0% 0%', borderRadius: '15px'}}/>
    //     <div className="card-body py-2 px-2" style={{fontFamily: 'Gugi, cursive', height: '14rem', padding: '0'}}>
    //         <p className="card-title text-left">{movie.title}</p>
    //     </div>
    //   </div>
    // </div>
    
    <div key={i.toString()} className="card content mx-1 mt-0 border-0" style={{ height: '15rem'}}>
      <div className="card-body p-0 d-flex" style={{width: '100%'}}>
        <button onClick={() => {
          handleUpdateButton(movie)
          handleShow();
          }} className="btn btn-warning p-3">Edit</button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditForm category={"Movies"} handleClose={handleClose} handleInputChange={handleInputChange} input={input} />
          </Modal.Body>
        </Modal>
        <div className="row d-flex">
          <div className="col-md-2">
            <img className="img-responsive" alt="img-skeleton2"
            src={movie.poster_path} 
            style={{ width: '100%', height: '15rem', objectPosition: "0% 0%"}}></img>
          </div>
          <div className="col-md-10 m-0 text-left pl-4">
            <div className="row">
              <h2 className="card-title m-0 mt-3 ml-2 mb-1">{movie.title}</h2>
              <p className="text-right ml-auto card-text mt-3 mr-4">{movie.popularity}</p>
            </div>
            <div className="row card-text m-0 mb-2">
              {
                movie.tags.map((tag: String) => {
                  return <p className="m-0"><span className="badge bg-info text-light mr-1">{tag}</span></p>
                })
              }
              <button type="button" className="btn btn-primary btn-sm ml-auto mr-3" data-toggle="modal" data-target={`#tag${i}`}>Add tag</button>
              <div className="modal fade" id={`tag${i}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Add Tag</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label htmlFor="tag">Add Tag</label>
                      </div>
                      <div className="mb-3">
                        <input type="text" value={tag} onChange={(e) => {
                          setTag(e.target.value)
                        }} name="tag" />
                      </div>
                      <button onClick={(e) => handleTagButton(movie._id, e)} type="button" className="btn btn-sm btn-primary" data-dismiss="modal">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <p className="card-text m-0">{movie.overview}</p>
              <button type="button" className="btn btn-sm btn-success" onClick={() => history.push(`/movies/${movie._id}`)}>Detail</button>
          </div>
        </div>
          <button onClick={(e) => handleDeleteButton(movie._id, e)} className="btn btn-danger justify-content-end">Delete</button>
      </div>
    </div>
    )
}