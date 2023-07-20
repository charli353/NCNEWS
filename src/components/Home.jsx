import React from 'react'
import { useState, useEffect } from 'react'
import { getArticles} from '../api'
import { Link } from 'react-router-dom'



export default function () {

    const [trending, setTrending] = useState(true)
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

  
    useEffect(() => {
      getArticles(trending).then((response) => {
        setArticles(response)
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
                setTrending(true)
            }}>Trending</button>
            <button className='trendall' onClick={(event) => {
                setTrending(false)
            }}>All Articles</button>
            <hr />
            <ul>
              <RetrieveArticles trending={trending} articles={articles}/>
            </ul>
          </section>
          <section id='topics'>
          <header>
                <h2>View Topics</h2>
            </header>
            <div id='spacer'></div>
            <hr />
    
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