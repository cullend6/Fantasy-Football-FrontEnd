import React, { useState } from 'react'
import get from '../modules/PlayerInfo'

export default function PlayerInfo({ player }){

    const [opponents, setOpponents] = useState([])

    get('fixtures', player, setOpponents)

    return (
        <div>
            <img src={get('pic', player)} alt='playerPic' />
            <div>
                {player.first_name}
            </div>
            <div>
                {player.second_name}
            </div>
            <div>
                {player.total_points}
            </div>
            <div>
                {opponents.map(opp => <div>{opp}</div>)}
            </div>
        </div>
    )
}