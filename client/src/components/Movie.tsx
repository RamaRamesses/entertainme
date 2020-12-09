import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { EditForm } from './EditForm';
import { useHistory, useRouteMatch, Route, Switch } from "react-router-dom";


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
  return (
    <div key={i.toString()} className="card content mx-1 mt-0 border-0" style={{width: '100%', height: '15rem'}}>
      <div className="card-body p-0 d-flex">
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
        <div className="row">
          <div className="col-md-1 pt-4 pl-4 mr-3">
            <img height="125rem" alt="skeleton-img"
            src="https://raw.githubusercontent.com/alexZajac/react-native-skeleton-content/master/demos/main.gif"></img>
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
            <img className="img-responsive" alt="img-skeleton2"
            src="https://hackathonthailand.com/images/default-thumbnail.gif" 
            style={{objectFit: 'cover', width: '150%', height: '100%'}}></img>
          </div>
        </div>
          <button onClick={(e) => handleDeleteButton(movie._id, e)} className="btn btn-danger">Delete</button>
      </div>
    </div>)
}