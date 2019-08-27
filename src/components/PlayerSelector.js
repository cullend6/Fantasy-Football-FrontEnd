import React, { useState } from 'react'
import query from '../modules/PlayerSelector'

export default function PlayerSelector(props) {

  const [teamNames, setTeamNames] = useState([])
  const [loading, setLoading] = useState(true)
  const [playerId, setPlayerId] = useState(1)
  const [playerNames, setPlayerNames] = useState([])

  const getInitialState = async () => {
    const teamNames = await query(0, 'teams')
    setTeamNames(teamNames)
    const playerNames = await query(1, 'team')
    setPlayerNames(playerNames)
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await query(playerId, 'player', playerNames)
    props.addPlayer(result)
  }

  const handleTeamChange = async (e) => {
    const result = await query(e.target.value, 'team') 
    setPlayerNames(result)
  }

  const handlePlayerChange = (e) => {
    setPlayerId(e.target.value)
  }

  let body = <div>Loading...</div>

  if (loading) {
    getInitialState()
  } else {
    body = <div className='player-selector'>
    <form onSubmit={handleSubmit}>

      <select className='dropdown' onChange={handleTeamChange} >
      {
        teamNames.map((name, index) => <option value={ index + 1 } key={index}>{ name }</option>)
        }
      </select>
      <select className='dropdown' onChange={handlePlayerChange}>
      {
        playerNames.map((name, index) => <option value={ index + 1 } key={index}>{ name }</option>)
      }
      </select>
      <input className='button' type='submit' value='Add Player' />
    </form>
  </div>
  }

  return body
}