import axios from 'axios'

export default function get(query, player, setOpponents) {
    if (query === 'pic') {
        return getPlayerSrc(player)
    }
    if (query === 'fixtures') {
        getPlayerFixtures(player, setOpponents)
    } else {
        return
    }
}

const getPlayerSrc = ({ photo }) => {
    const result = photo.replace('jpg', 'png')
    return 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/p' + result
}

const getPlayerFixtures = async ({ id }, setOpponents) => {
    const { data: { fixtures: fixtureData } } = await axios.get('http://localhost:5000/players?fixtures=' + id)
    const upcomingFixtures = fixtureData.filter((fixture, index) => (index < 3))
    const opponentIds =  upcomingFixtures.map(fixture => fixture.is_home ?  fixture.team_a : fixture.team_h)
    const opponents = await getTeamNames(opponentIds)
    setOpponents(opponents)
}

const getTeamNames = async (Ids) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/teams`)
        const teamNames = data.map(team => team.name)
        teamNames.sort()
        const opponents = Ids.map(id => teamNames[id-1])
        return opponents
    } catch (e) {

    }
}