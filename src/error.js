import React from 'react';
import { useHistory } from 'react-router-dom';

function Error(){
    let history = useHistory()

    const goBack = () =>{
        history.push('/')
    }

    return(
        <div className='error-div'>
            <h1 className='title'>Something went wrong</h1>
            <p>Why don't you return to the beggining?</p>
            <button className='error-btn white-text' onClick={goBack}>Go back</button>
        </div>
    )
}

export default Error