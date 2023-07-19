import React from 'react'

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
  

