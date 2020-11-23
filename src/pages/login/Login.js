import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const history = useHistory()

    const onSubmit = () => {
        console.log(history.location.pathname)

        if(
            (username === 'admin' && password === 'admin') || 
            (username === 'indra' && password === 'indra') ||
            (username === 'yahya' && password === 'yahya')
            ){
            localStorage.setItem('username', username)
            setError(false)
            history.push('home')
        }else{
            setError(true)
        }
    }

    return (
        <div className="outer">
            <div className="inner">
                {error && <Alert variant="danger">Username or password invalid</Alert>}
                <h3>Log in</h3>
                <div className="form-group">
                    <label>Username</label>
                    <input type="test" className="form-control" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="button" className="btn btn-dark btn-lg btn-block" onClick={onSubmit}>Sign in</button>
            </div>
        </div>
    )
}

export default Login