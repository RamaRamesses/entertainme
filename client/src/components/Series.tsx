import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { DELETE_SERIES, GET_SERIES } from '../config/queries';
import useHandleInputForm from '../helpers/useHandleInputForm';
import {AddForm} from './AddForm'
import {EditForm} from './EditForm'

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
                    <AddForm category={"Series"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          data.allSeries.map((series : SeriesObj, i : Number) => {
            return (
            <div key={i.toString()} className="card content mx-1 mt-0 border-0" style={{width: '100%', height: '15rem'}}>
              <div className="card-body p-0 d-flex">
                <button onClick={() => handleUpdateButton(series)} data-toggle="modal" 
                data-target="#modalUpdate" className="btn btn-warning p-3">Edit</button>
                <div className="modal fade" id="modalUpdate" tabIndex={-1} role="dialog" 
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
                        <EditForm input={input} handleInputChange={handleInputChange} category={"Series"} />
                      </div>
                    </div>
                  </div>
                </div>
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