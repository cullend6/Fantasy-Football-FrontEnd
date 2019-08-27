import React, { useState } from 'react';
import './App.css';
import TeamSelector from './components/TeamSelector'
import Login from './components/Login'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  const [user, setUser] = useState()

  const displayBody = () => {
    if(!user) {
      return (
        <div className='login-box'>
          <Login setUser={setUser} />
        </div>
      )
    }
    return <TeamSelector user={user} />
  }

  return (
    <div className='App'>
      <Header />
      {displayBody()}
      <Footer />
    </div>
  )
}

export default App;
