import React, { useEffect, useRef, useState } from 'react'
import { getUser } from '../api'

export default function () {
    const [inputFeedback, setInputFeedback] = useState('success')
    const [validity, setValid] = useState('false')
    const [user, setUser] = useState('')
    const [userAuth, setUserAuth] = useState(localStorage.getItem((`globalUser`)))
    const isMounted = useRef(false)
    const [loggedIn, setLoggedIn] = useState(userAuth)

    

    useEffect(() => {

        getUser(userAuth).then((response) => {
            console.log(response)
            setValid('true')
        }).catch((err) => {
            setValid('false')
            console.log(err)
            //invalid form set to fail
        })
    }, [userAuth])

    useEffect(() => {
        if(validity){
            getUser(user).then((response) => {

                if (isMounted.current) {
                    console.log(response)
                    localStorage.setItem('globalUser', JSON.stringify(response))
                    setLoggedIn(response.username)
                   
                  } else {
                    isMounted.current = true;
                  }
            })
        }
    }, [user])

    console.log(localStorage)
    console.log(userAuth)
    const isLoggedIn = (userAuth) => {
        
        if(loggedIn){
            localStorage.setItem('loggedin', `${userAuth}`)
        }
        else {
            localStorage.setItem('loggedin', `${userAuth}`)
        }
    }
     isLoggedIn(userAuth)

    return (
        <div>
            <form>
                <h2>Log Into Existing User</h2>
                <label htmlFor="login"></label>
                <input type="text" id={inputFeedback} onChange={(event) => {
                    setUser(event.target.value)
                }}/>
                <button id='submitbutton' onClick={(event) => {
                    event.preventDefault()
                    console.log(user)
                    setUserAuth(user)
                }}>Submit</button>
            </form>
        </div>
      )
      }

