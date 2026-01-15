import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

import NavBar from './components/NavBar'
import LoginView from './components/LoginView'
import RegisterView from './components/RegisterView'

interface HelloResponse {
  message: string
}

const App = () => {
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const fetchHello = async () => {
      try {
        const res = await axios.get<HelloResponse>('/api/hello')
        setMessage(res.data.message)
      } catch (err) {
        console.error(err)
      }
    }
    void fetchHello()
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <NavBar />
      <p>Welcome to RepeatEat</p>
      <button onClick={() => alert(message)}>Say hello</button>

      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </div>
  )
}

export default App
