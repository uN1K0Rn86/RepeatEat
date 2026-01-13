import { useEffect, useState } from 'react'
import axios from 'axios'

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
      <p>Welcome to RepeatEat</p>
      <button onClick={() => alert(message)}>Print hello</button>
    </div>
  )
}

export default App
