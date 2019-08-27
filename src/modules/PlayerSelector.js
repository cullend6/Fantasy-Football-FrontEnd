import axios from 'axios'

export default async function query(query, type, playerNames) {
    if (type === 'team') {
        const result = await updatePlayerNames(query)
        return result
    }
    if ( type === 'teams') {
        const result = await getTeamNames()
        return result
    }
    return getPlayer(query, playerNames)
}

const updatePlayerNames = async (Id) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/players?team=${Id}`)
        const playerNames = data.map(player => player.web_name)
        return playerNames
    } catch (e) {
        console.log(e)
    }
}

const getTeamNames = async () => {
    try {
        const { data } = await axios.get(`http://localhost:5000/teams`)
        
        const teamNames = data.map(team => team.name)
        teamNames.sort()
        return teamNames
    } catch (e) {

    }
}

const getPlayer = async (playerId, playerNames) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/players?name=${playerNames[playerId - 1]}`)
        return data[0]
    } catch (e) {
        console.log(e)
    }
}