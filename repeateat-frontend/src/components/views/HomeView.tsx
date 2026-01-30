import { useState, useEffect } from 'react'
import axios from 'axios'

import { useBoundStore } from '@/store'
import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'

interface HelloResponse {
  message: string
}

const HomeView = () => {
  const [message, setMessage] = useState<string>('')
  const setPageTitle = useBoundStore((state) => state.setPageTitle)
  const { t } = useTranslation(['common'])

  useEffect(() => {
    setPageTitle('home')
  }, [t, setPageTitle])

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
      <p>{t('welcome_message')}</p>
      <Button onClick={() => alert(message)}>{t('common:say_hello')}</Button>
    </div>
  )
}

export default HomeView
