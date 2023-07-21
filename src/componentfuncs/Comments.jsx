import React from 'react'
import { useState } from 'react'

import { getComments, postComment, deleteComment } from '../api'


export function RetrieveComments (props) {
    const [popUp, setPopUp] = useState(false)

    const comments = props.comments
    const showing = props.show
    const id = props.id
    if(showing && comments.length !== 0){
    return comments.map((comment) => {
      return <li key={comment.comment_id}>
        <h2>{comment.author}</h2>
        <p>"{comment.body}"</p>
  
        <DeleteButton comment={comment} id={id} />
  
        <hr id='commentdivider'/>
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
  const [comment, setComment] = useState('')
  const [validity, setValid] = useState('true')
  const [inputFeedback, setInputFeedback] = useState('success')



  const showing = props.show
  const currentId = props.id

  const commentValidate = (comment) => {
    if (typeof comment === 'string' && comment.length > 15){
      postComment(currentId, comment).catch((err) => {
        setValid('Network Error, Try Again')
      })
      .then(() => {
        setInputFeedback('success')
        setValid("true")
      })
    }
    else {
      setInputFeedback('fail')
      setValid("false")
    }
  }



  
  if(showing){
    return (
      <div id='commentarea'>
        <form>
          <label htmlFor={inputFeedback}></label>
          <input type="text" className={inputFeedback} value={comment} placeholder='Post a Comment' onChange={(event) => {
            setComment(event.target.value)
            setInputFeedback('success')
          }}/>
          <FailedForm valid={validity}/>
          <button id='submitbutton' onClick={(event) => {
            event.preventDefault()
            commentValidate(comment)
            setComment('')
          }}>Submit</button>
        </form>
      </div>
    )
  }
}

function FailedForm (props) {
  const validity = props.valid

  if (validity === 'false'){
    return (
      <h3>Minimum 15 Characters...</h3>
    )
  }
  else if (validity === 'Network Error, Try Again'){
    return validity
  }
}

function DeleteButton(props) {

  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(true)
  const currentComment = props.comment
  const currentId = props.comment.comment_id


  const deleteHandler = (currentId) => {
 
    setLoading(true)
    deleteComment(currentId).then((data) => {
      alert(data)
    })

  }
  console.log(localStorage)
  if(localStorage.loggedin === currentComment.author ){
    
    return (
      <section>
      <button id='deletecomment'onClick={(event) => {
        event.preventDefault()
        deleteHandler(currentId)

      }}>Delete</button>
      </section>
    )
  } 
}