import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getArticles } from '../api'
import { Link } from 'react-router-dom'

export default function Topic() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

const currentTopic = useParams().slug
const formatTopic = currentTopic[0].toUpperCase() + currentTopic.slice(1, currentTopic.length)
const query = {type : 'topic', query : currentTopic}



useEffect(() => {
    getArticles(query.type, query.query).then((response) => {
      setArticles(response)
    })
    .then(()=>{
      setLoading(false)
    })
  }, [])

  return (
    <div id='topicpage'>
        <div id='topictitle'>
        <h1>"{formatTopic}"</h1>
        <p>Articles About {formatTopic} : {articles.length}</p>
        </div>
        <div id='articlesbytopic'>
            {articles.map((article) => {
                return (
                    <Link to={`/articles/${article.article_id}`} key={article.article_id}>
                    <div className='article'>
                      <h2>{article.title}</h2>
                      <p>Author : {article.author}</p>
                      <p>Topic : {article.topic}</p>
                   </div>
                   </Link>
                )
            })}
        </div>
        
    </div>
  )
}
