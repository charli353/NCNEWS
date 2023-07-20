import React from 'react'
import { useState, useEffect } from 'react'
import { getArticles, getTopics} from '../api'
import { Link } from 'react-router-dom'



export default function () {

    const [query, setQuery] = useState('trending')
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [topics, setTopics] = useState([])

  
    useEffect(() => {
      getArticles(query).then((response) => {
        setArticles(response)
      })
      .then(() => {
        getTopics().then((response) => {
          setTopics(response)
        })
      })
      .then(()=>{
        setLoading(false)
      })
    }, [])



    return loading ? <p className='loader'>Loading...</p> : (
        <main id='mainContainer'>
          <section id='trending'>
            <header>
                <h2>View Articles</h2>
            </header>
            <button className='trendall' onClick={(event) => {
                setQuery('trending')
            }}>Trending</button>
            <button className='trendall' onClick={(event) => {
                setQuery(false)
            }}>All Articles</button>
            <hr />
            <ul>
              <RetrieveArticles trending={query} articles={articles}/>
            </ul>
          </section>
          <section id='topics'>
          <header>
                <h2>View Topics</h2>
            </header>
            <div id='spacer'></div>
            <hr />
            <ul>
              <RetrieveTopics topics={topics}/>
            </ul>
          </section>
          <section id='post'>
          <header>
                <h2>Post Article</h2>
            </header>
            <div id='spacer'></div>
            <hr />
          </section>
          
        </main>
      )
}

function RetrieveArticles(props) {
    const trending = props.trending
    const articles = props.articles
    
    if (trending === true) {
        return articles.map((article) => {
                return ( 
                  <Link to={`/articles/${article.article_id}`} key={article.article_id}>
                  <div className='article'>
                    <h2>{article.title}</h2>
                    <p>Author : {article.author}</p>
                    <p>Topic : {article.topic}</p>
                    <p>Comments : {article.comment_count}</p>
                 </div>
                 </Link>
               )
              })
    }
    else {
        return articles.map((article) => {
            console.log(article)
                return ( 
                <Link to={`/articles/${article.article_id}`}>
                  <div className='article'>
                  <h2>{article.title}</h2>
                  <p>Author : {article.author}</p>
                  <p>Topic : {article.topic}</p>
                  <p>Comments : {article.comment_count}</p>
                 </div>
                </Link>
                    
                    
               )
              })
    }
  
  }

  function RetrieveTopics(props) {
    const topics = props.topics

    return topics.map((topic) => {
      const formatSlug = topic.slug[0].toUpperCase() + topic.slug.slice(1, topic.slug.length)
      return ( 
        <Link to={`/topics/${topic.slug}`} key={topic.slug}>
        <div className='article'>
          <h2>{formatSlug}</h2>
          <p>Description : {topic.description}</p>
       </div>
       </Link>
     )
    })
  }