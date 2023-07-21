import React from 'react'
import { useState, useEffect } from 'react'
import { getArticles, getTopics} from '../api'
import { Link } from 'react-router-dom'



export default function () {

    const [query, setQuery] = useState('votes')
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [topics, setTopics] = useState([])
    const [order, setOrder] = useState('DESC')

  
    useEffect(() => {
      getArticles(query, order).then((response) => {
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
    }, [query, order])

    const queryFormatter = (query, order) => {
      let qString
      let oString
      if(query === 'comment_count'){
        qString = 'Comments'
      }
      if(query === 'votes'){
        qString = 'Likes/Trending'
      }
      if(query === 'all'){
        qString = 'None'
      }
      if(query === 'created_at'){
        qString = 'Date'
      }
      if(order === 'ASC'){
        if(query === 'created_at'){
          oString = 'Oldest'
        }
        else {
          oString = 'Ascending'
        }
      }
      if(order === 'DESC'){
        if(query === 'created_at'){
          oString = 'Most Recent'
        }
        else {
          oString = 'Descending'
        } 
      }
      return [qString, oString]
    }

    const orderOrDate = (query) => {
      if(query === 'created_at'){
        return ['Most Recent', 'Oldest']
      }
      else return ['Descending', 'Ascending']
    }



    return loading ? <p className='loader'>Loading...</p> : (
        <main id='mainContainer'>
          <section id='trending'>
            <header>
                <h2>View Articles</h2>
            </header>
            <button className='trendall' onClick={(event) => {
                setQuery('all')
            }}>All Articles</button>
            <button className='trendall' onClick={(event) => {
                setQuery('votes')
            }}>Trending</button>
            <button className='trendall' onClick={(event) => {
                setQuery('comment_count')
            }}>Comments</button>
            <button className='trendall' onClick={(event) => {
                setQuery('created_at')
            }}>Date</button>
            <br />
            <button className='trendall' onClick={(event) => {
                setOrder('ASC')
            }}>{orderOrDate(query)[1]}</button>
            <button className='trendall' onClick={(event) => {
                setOrder('DESC')
            }}>{orderOrDate(query)[0]}</button>
            <hr />
            <p id='sortString'>Sorting By : {queryFormatter(query, order)[0]} - Order : {queryFormatter(query, order)[1]}</p>
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

    return articles.map((article) => {
                  return ( 
                    <Link to={`/articles/${article.article_id}`} key={article.article_id}>
                    <div className='article'>
                      <h2>{article.title}</h2>
                      <p>Author : {article.author}</p>
                      <p>Topic : {article.topic}</p>
                      <p>Likes : {article.votes}</p>
                      <p>Comments : {article.comment_count}</p>
                   </div>
                   </Link>
                 )
                })
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
