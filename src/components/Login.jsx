import React, { useEffect, useState } from 'react'
import { getUser } from '../api'

export default function () {
    const [inputFeedback, setInputFeedback] = useState('success')
    const [validity, setValid] = useState('false')
    const [user, setUser] = useState('')
    const [userAuth, setUserAuth] = useState('')

    

    useEffect(() => {
        setValid('false')
        getUser(userAuth).then((response) => {
            setValid('true')
            localStorage.setItem('globalUser', JSON.stringify(response))
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }, [userAuth])

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

