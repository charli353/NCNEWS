import React from 'react'
import { useState } from 'react'

import { getComments, postComment } from '../api'


export function RetrieveComments (props) {
    const comments = props.comments
    const showing = props.show
    if(showing && comments.length !== 0){
    return comments.map((comment) => {
      return <li key={comment.comment_id}>
        <h2>{comment.author}</h2>
        <p>"{comment.body}"</p>
      </li>
    })
  }
  if(showing && comments.length === 0){
    return <h2>No Comments</h2>
  }
  else {
    return 
  }
}
  
export function LeaveComment (props) {
  const [comment, setComment] = useState()
  const [validity, setValid] = useState(true)
  const [inputFeedback, setInputFeedback] = useState('success')


  const showing = props.show
  const currentId = props.id

  const formValidation = (comment) => {
    if (typeof comment === 'string' && comment.length > 15){
      postComment(currentId, comment).catch((err) => {
        setValid('Network Error, Try Again')
      })
      setValid(true)
    }
    else {
      setInputFeedback('fail')
      setValid(false)
    }
  }



  
  if(showing){
    return (
      <div id='commentarea'>
        <form>
          <label htmlFor={inputFeedback}></label>
          <input type="text" id={inputFeedback} value={comment} placeholder='Post a Comment' onChange={(event) => {
            setComment(event.target.value)
          }}/>
          <InvalidForm valid={validity}/>
          <button id='submitbutton' onClick={(event) => {
            event.preventDefault()
            formValidation(comment)
            setComment('')
          }}>Submit</button>
        </form>
      </div>
    )
  }
}

function InvalidForm (props) {
  const validity = props.valid

  if (!validity){
    return (
      <h3>Minimum 15 Characters...</h3>
    )
  }
  else if(typeof validity === 'string'){
    return (
      <h3>{validity}</h3>
    )
  }
}
