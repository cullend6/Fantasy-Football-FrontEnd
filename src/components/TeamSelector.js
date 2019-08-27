import React, { useState } from 'react'
import PlayerSelector from './PlayerSelector'
import addToTeam from '../modules/TeamSelector'
import PlayerInfo from '../components/PlayerInfo'

export default function TeamSelector(props) {

    const [goalkeepers, setGoalkeepers] = useState(props.user.team.goalkeepers)
    const [defenders, setDefenders] = useState(props.user.team.defenders)
    const [midfielders, setMidfielders] = useState(props.user.team.midfielders)
    const [forwards, setForwards] = useState(props.user.team.forwards)
    const [teamValue, setTeamValue] = useState()
    const [message, setMessage] = useState()
    const [player, setPlayer] = useState()
    const [displayPlayer, setDisplayPlayer] = useState(false)

    const addPlayer = async (player) => {
        const team = { goalkeepers, defenders, midfielders, forwards }
        switch (player.element_type) {
            case 1:
                const { newPlayers: newGKs, newValue: newValue1, message: message1 = null } = await addToTeam(player, goalkeepers, 2, team)
                setGoalkeepers(newGKs)
                setTeamValue(newValue1)
                setMessage(message1)
                break          
            case 2:
                const { newPlayers: newDEFs, newValue: newValue2, message: message2 = null } = await addToTeam(player, defenders, 5, team)
                setDefenders(newDEFs)
                setTeamValue(newValue2)
                setMessage(message2)
                break                 
            case 3:
                const { newPlayers: newMIDs, newValue: newValue3, message: message3 = null } = await addToTeam(player, midfielders, 5, team)
                setMidfielders(newMIDs)
                setTeamValue(newValue3)
                setMessage(message3)
                break   
            case 4:
                const { newPlayers: newFWDs, newValue: newValue4, message: message4 = null } = await addToTeam(player, forwards, 3, team)
                setForwards(newFWDs)
                setTeamValue(newValue4)
                setMessage(message4)
                break 
            default:
                setMessage('Error adding player.')    
        }       
    }

    const handleReset = () => {
        setGoalkeepers([])
        setDefenders([])
        setMidfielders([])
        setForwards([])
        setTeamValue(0)
        setMessage()
    }

    const displayPlayerInfo = (player) => {
        setPlayer(player)
        setDisplayPlayer(true)
    }

    const displayPosition = (position) => {
        return position.map(player => <button onClick={() => displayPlayerInfo(player)} className='player'>{player.web_name + `  `}</button>)
    }

    const handleSave = () => {
        addToTeam('save', { goalkeepers, defenders, midfielders, forwards }, props.user._id)
    }

    const handleEmail = () => {
        addToTeam('email', props.user._id)
    }

    return (
        <div className='application'>
            <div className='team-body'>
                <PlayerSelector addPlayer={addPlayer}/>
                <div className='goalkeepers'>
                    Team Value: {teamValue}
                </div>
                <div className='goalkeepers'>
                    { displayPosition(goalkeepers) }
                </div>
                <div className='goalkeepers'>
                    { displayPosition(defenders) }
                </div>
                <div className='goalkeepers'>
                    { displayPosition(midfielders) }
                </div>
                <div className='goalkeepers'>
                    { displayPosition(forwards) }
                </div>
                <div className='team-buttons'>
                    <button className='button' onClick={handleSave}>Save team</button>
                    <button className='button' onClick={handleReset}>Clear</button>
                    <button className='button' onClick={handleEmail}>Send Changes</button>
                </div>
                <div className='error-message'>
                    {message}
                </div>
            </div>
            <div className='player-info'>
                {displayPlayer ? <PlayerInfo player={player} /> : null}
            </div>
        </div>
    )
}