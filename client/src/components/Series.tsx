import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_SERIES_TAG, DELETE_SERIES, GET_SERIES } from '../config/queries';
import useHandleInputForm from '../helpers/useHandleInputForm';
import {AddForm} from './AddForm'
import {EditForm} from './EditForm'
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom';


interface SeriesObj {
  _id: String,
  title: String,
  overview: String,
  poster_path: String,
  popularity: Number,
  tags: [String]
}

interface Series {
  series: SeriesObj[]
}

interface Props {
  data: Series,
  seriesData: any
}

export const Series : React.FC = () => {
  const { handleInputChange, input, setInput } = useHandleInputForm();
  const { loading, error, data } = useQuery(GET_SERIES)
  const [ deleteSeries, {data: delData} ] = useMutation(DELETE_SERIES)
  const [ addTag, {data: tagData} ] = useMutation(ADD_SERIES_TAG)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tag, setTag] = useState('')
  const history = useHistory();

  function handleDeleteButton(id: any, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    deleteSeries({
      variables: {
        id
      },
      refetchQueries: [{
        query: GET_SERIES
      }]
    })
  }

  function handleTagButton(id: any, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    addTag({
      variables: {
        series: {
          id,
          tag
        }
      },
      refetchQueries: [{
        query: GET_SERIES
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
    handleShow();
  }
  console.log(data)

  if(loading) return <h1>Loading</h1>
  if(error) return <h1>Error</h1>
  return (
    <div className="container mt-4">
        <div className="row d-flex mb-2">
          <div className="col-md-11">
            <h1 className="text-left ml-2">Series</h1>
          </div>
          <div className="col-md-1">
             <button className="btn btn-lg text-white bg-info" onClick={() => history.push('/tvseries/add')}>+</button>
          </div>
        </div>
        {
          data.allSeries.map((series : SeriesObj, i : Number) => {
            return (
            <div key={i.toString()} className="card content mx-1 mt-0 border-0" style={{width: '100%', height: '15rem'}}>
              <div className="card-body p-0 d-flex">
                <button onClick={() => handleUpdateButton(series)} className="btn btn-warning p-3">Edit</button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EditForm handleClose={handleClose} input={input} handleInputChange={handleInputChange} category={"Series"} />
                  </Modal.Body>
                </Modal>
                <div className="row">
                  <div className="col-md-1 pt-4 pl-4 mr-3">
                    <img height="125rem" 
                    src="https://raw.githubusercontent.com/alexZajac/react-native-skeleton-content/master/demos/main.gif"></img>
                  </div>
                  <div className="col-md-8 m-0 text-left pl-4">
                    <div className="row">
                      <h2 className="card-title m-0 mt-3 ml-2 mb-1">{series.title}</h2>
                      <p className="text-right ml-auto card-text mt-3">{series.popularity}</p>
                    </div>
                    <p className="card-text m-0">{series.poster_path}</p>
                    <div className="row card-text m-0">
                      {
                        series.tags.map((tag: String) => {
                          return <p className="m-0"><span className="badge bg-info mr-1 text-light">{tag}</span></p>
                        })
                      }
                      <button type="button" className="btn btn-primary btn-sm ml-auto" data-toggle="modal" data-target={`#tag${i}`}>Add tag</button>
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
                              <button onClick={(e) => handleTagButton(series._id, e)} type="button" className="btn btn-sm btn-primary" data-dismiss="modal">Submit</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                      <p className="card-text m-0">{series.overview}</p>
                  </div>
                  <div className="col-md-2 justify-content-end">
                    <img className="img-responsive" src="https://hackathonthailand.com/images/default-thumbnail.gif" 
                    style={{objectFit: 'cover', width: '150%', height: '100%'}}></img>
                  </div>
                </div>
                  <button onClick={(e) => handleDeleteButton(series._id, e)} className="btn btn-danger">Delete</button>
              </div>
            </div>)
          })
        }  
      </div>
  )
}