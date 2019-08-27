import React, { useState } from 'react'
import SignUp from './SignUp'
import loginUser from '../modules/Login'

export default function Login(props) {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] =useState()
    const [showSignUp, setShowSignUp] = useState(false)

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await loginUser({ email, password })
        if (response.error) {
            setErrorMessage(response.error)
        }
        else {
            props.setUser(response[0])
        }
    }

    const handleSignUpClick = () => {
        setShowSignUp(!showSignUp)
    }

    const display = (showSignUp) => {
        if (showSignUp){
            return <SignUp email={email} password={password} goBack={handleSignUpClick} setUser={props.setUser}/>
        }
        return (
            <div className='login'>
                <form onSubmit={handleSubmit}>
            <div>
                <input className='email-box' type='text' value={email} onChange={handleEmailChange} placeholder='Email'></input>
            </div>
            <div>
                <input className='password-box' type='password' value={password} onChange={handlePasswordChange} placeholder='Password'></input>
            </div>

            <input className='button' type='submit' value='Login'/>
            </form>
            <button className='button' onClick={handleSignUpClick}>Sign Up</button>
            <div>
                {errorMessage}
            </div>
            </div>
        )
    }

    return display(showSignUp) 
}