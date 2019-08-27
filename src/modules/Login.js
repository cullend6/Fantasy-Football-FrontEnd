import axios from 'axios'

export default async function login({ email, password }) {
    const { data: result } = await axios.get(`http://localhost:5000/users?email=${email}&password=${password}`)
    return result
}