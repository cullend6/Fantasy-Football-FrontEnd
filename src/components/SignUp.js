import React, { useState } from 'react'
import createUser from '../modules/SignUp'

export default function Login(props) {
    
    const [email, setEmail] = useState(props.email)
    const [password, setPassword] = useState(props.password)
    const [passwordCheck, setPasswordCheck] = useState('')
    const [errorMessage, setErrorMessage] =useState()

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handlePasswordCheckChange = (e) => {
        setPasswordCheck(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newUser = await createUser({ email, password, passwordCheck })
        if (!newUser.email) {
            setErrorMessage(newUser)
        } else {
            props.setUser(newUser)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' value={email} onChange={handleEmailChange} placeholder='Email'></input>
                </div>
                <div>
                    <input type='password' value={password} onChange={handlePasswordChange} placeholder='Password'></input>
                </div>
                <div>
                <input type='password' value={passwordCheck} onChange={handlePasswordCheckChange} placeholder='Confirm Password'></input>
                </div>
                <input type='submit' value='Create User'/>
            </form>
            <button onClick={props.goBack}>Back</button>
            <div>
                {errorMessage}
            </div>
        </div>
    )
}