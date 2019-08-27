const axios = require('axios')

export default async function addToTeam(player, currentPlayers, maxAmount, team) {

    if (player === 'save') {
        saveTeam(currentPlayers, maxAmount)
        return
    }
    if (player === 'email') {
        sendEmail(currentPlayers)
        return
    }
    const { data } = await axios.post('http://localhost:5000/addPlayer', {
        player,
        currentPlayers,
        maxAmount,
        team
    })
    return data
}

const saveTeam = (players, id) => {
    const team = {
        team: players
    }
    axios.patch(`http://localhost:5000/users?id=${id}`, team)
}

const sendEmail = (id) => {
    axios.post(`http://localhost:5000/sendEmail?id=${id}`)
}