import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import NavBar from './components/NavBar'
import HomeView from './components/HomeView'
import LoginView from './components/LoginView'
import RegisterView from './components/RegisterView'
import UserProfile from './components/UserProfile'
import NotificationList from './components/NotificationList'
import { useBoundStore } from './store'

const App = () => {
  useEffect(() => {
    void useBoundStore.getState().checkAuth()
  }, [])

  return (
    <div className="flex-1 p-2 bg-gray-700 text-gray-200 min-h-screen space-y-2">
      <NavBar />
      <NotificationList />

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  )
}

export default App
