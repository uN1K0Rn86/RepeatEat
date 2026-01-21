import { useState, useEffect } from 'react'
import axios from 'axios'

import { useBoundStore } from '@/store'
import { Button } from '../ui/button'

interface HelloResponse {
  message: string
}

const HomeView = () => {
  const [message, setMessage] = useState<string>('')
  const setPageTitle = useBoundStore((state) => state.setPageTitle)

  useEffect(() => {
    setPageTitle('Home')
  }, [setPageTitle])

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
    <div className="flex flex-col items-center p-5">
      <p>Welcome to RepeatEat</p>
      <Button onClick={() => alert(message)} variant={'secondary'}>
        Say hello
      </Button>
    </div>
  )
}

export default HomeView
