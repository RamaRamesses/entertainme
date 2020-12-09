import React, {useState} from 'react';

export default function useHandleInputForm () {
    const [input, setInput] = useState({title: '', overview: '', poster_path: '', popularity: 0})
    function handleInputChange (event: React.ChangeEvent<HTMLInputElement>) {
        setInput(input => ({...input, [event.target.name]: event.target.value }))
    }
    return {input, handleInputChange}
  }