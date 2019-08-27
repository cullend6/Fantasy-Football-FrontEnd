import axios from 'axios'

export default async function createUser(user) {
    const { data: newUser } = await axios.post('http://localhost:5000/users', user)
    return newUser 
}