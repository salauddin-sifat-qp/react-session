import {WuPrimaryNavbar} from '@npm-questionpro/wick-ui-lib'
import './App.css'
import {TodoListScreen} from './screens/TodoListScreen'
import {API_BASE_URL} from './constants/appConstants'
import type {IServerResponse} from './types/IServerResponse'
import type {IUser} from './types/IUser'
import {useEffect, useState} from 'react'

const fetchUser = async (): Promise<IServerResponse<IUser>> => {
  return fetch(`${API_BASE_URL}user`, {
    method: 'GET',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json() as Promise<IServerResponse<IUser>>
  })
}

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<IUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUser()
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  if (!user) {
    throw new Error('User not found')
  }

  return (
    <>
      <div>
        <WuPrimaryNavbar
          Links={[
            <a key="home" href="#" className="active">
              Home
            </a>,
            <a key="about" href="#">
              About
            </a>,
            <a key="services" href="#">
              Services
            </a>,
            <a key="contact" href="#">
              Contact
            </a>,
          ]}
        />
        <TodoListScreen />
      </div>
      {/* <h1>{user?.email}</h1> */}
    </>
  )
}
