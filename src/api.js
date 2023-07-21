import axios from 'axios'

const defaultURL = axios.create({
    baseURL : 'https://nc-news-production.onrender.com/api'
  })

export const getArticles = (query, order) => {

    if(query !== 'all' && query !== 'topic'){
        return defaultURL.get(`/articles?sort_by=${query}&order=${order}`).then(({data}) => {
            return data.articles
        })
    }
    if(query === 'topic'){
        return defaultURL.get(`/articles?topic=${order}`).then(({data}) => {
            return data.articles
        })
    }
    else {
        return defaultURL.get('/articles').then(({data}) => {
            return data.articles
        })
    }
 
}

export const getArticle = (id) => {

    return defaultURL.get(`/articles/${id.article_id}`).then(({data}) => {
        
        return data.articles[0]
    })
}

export const getComments = (id) => {
    return defaultURL.get(`/articles/${id.article_id}/comments`).then(({data}) => {
        
        return data.comments
    })
}   

export const updateVotes = (id) => {
        return defaultURL.patch(`/articles/${id.article_id}`, {inc_votes : + 1}).then(({data}) => {
            return data
        })
    }


export const postComment = (id, comment) => {
    return defaultURL.post(`/articles/${id.article_id}/comments`, {username : 'weegembump', body : comment }).then(({data}) => {
        return data
    })
}

export const getTopics = () => {
    return defaultURL.get(`/topics`).then(({data}) => {
        
        return data.topics
    })
}   

export const getUser = (user) => {
    return defaultURL.get(`/users/${user}`).then(({data}) => {
        console.log(data)
        return data.user
    })
}   


