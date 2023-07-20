import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getArticle, getComments, updateVotes } from '../api'
import { RetrieveComments, LeaveComment } from '../componentfuncs/Comments'


export default function (props) {
    const [article, setArticle] = useState({})
    const [comments, setComments] = useState([])
    const [showComments, setShow] = useState(false)
    const [loading, setLoading] = useState(true)
    const [likes, setLikes] = useState(0)
    const [err, setErr] = useState(null);



    const currentId = useParams()



    useEffect(() => {
        getArticle(currentId).then((response) => {
          setArticle(response)
          setLikes(response.votes)
        })
        .then(() => {
          getComments(currentId).then((response) => {
            setComments(response)
          })
        })
        .then(()=>{
          setLoading(false)
        })
      }, [comments])

      


  return loading ? <p className='loader'>Loading...</p> : (
    <div id='singleArticle'>
      <div id='articletitle'>
      <h2>"{article.title}"</h2>
      </div>
      <div id='articleimg'>
      <img src={article.article_img_url} alt="Article Cover Art" id='imgchild'/>
      </div>
      <div id='articlebody'>
      <h3 id='body'>{article.body}</h3>
      <button id='likebutton' onClick={(event) => {
        setLikes((currLikes) => currLikes + 1)
        updateVotes(currentId).catch((err) => {
          setLikes((currLikes) => currLikes - 1)
          setErr('Something went wrong. Please try again later')
        })
      }}>LIKE : {likes}</button>
      <h3>{err}</h3>
      
      </div>
      

      <div id='comments'>
        <button id='commentsbutton' onClick={(event) => {
          setShow(prevShow => !prevShow)
        }}><ButtonSwitch show={showComments}/></button>
        <LeaveComment show={showComments} id={currentId}/>
        <RetrieveComments comments={comments} show={showComments}/>
      </div>
    </div>
  )
}

function ButtonSwitch(props){
  const showing = props.show
  if(showing){
    return 'Hide Comments'
  }
  else return 'Show Comments'
}