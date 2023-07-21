import React, { useEffect, useRef, useState } from 'react'
import { getUser } from '../api'

export default function () {
    const [inputFeedback, setInputFeedback] = useState('success')
    const [validity, setValid] = useState('false')
    const [user, setUser] = useState('')
    const [userAuth, setUserAuth] = useState(localStorage.globalUser)
    const isMounted = useRef(false)
    const [loggedIn, setLoggedIn] = useState(userAuth)

    

    useEffect(() => {
        setInputFeedback('success')
        getUser(userAuth).then((response) => {

            setValid('true')

        }).catch((err) => {
            setValid('false')
            console.log(err)
            inputFeedback('fail')
        })
    }, [userAuth])

    useEffect(() => {
        if(validity){
            getUser(user).then((response) => {

                if (isMounted.current) {
             
                    localStorage.setItem('globalUser', (response.username))
                    setLoggedIn(response.username)
                   
                  } else {
                    isMounted.current = true;
                  }
            })
        }
    }, [user])

    const isLoggedIn = (userAuth) => {
        
        if(loggedIn){
            localStorage.setItem('loggedin', `${userAuth}`)
        }
        else {
            console.log('are we here')
            localStorage.setItem('loggedin', `Login`)
        }
    }
     isLoggedIn(userAuth)


    return (
        <div>
            <form>
                <h2 id='loginprompt'>Log Into Existing User</h2>
                <label htmlFor="login"></label>
                <input type="text" className={inputFeedback} onChange={(event) => {
                    setUser(event.target.value)
                }}/>
                <button id='submitbutton' onClick={(event) => {
                    window.location.reload()
                    console.log(user)
                    setUserAuth(user)
                }}>Submit</button>
            </form>
        </div>
      )
      }

