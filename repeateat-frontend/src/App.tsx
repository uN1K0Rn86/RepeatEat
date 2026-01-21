import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import NavBar from './components/navigation/NavBar'
import HomeView from './components/HomeView'
import LoginView from './components/LoginView'
import RegisterView from './components/RegisterView'
import UserProfile from './components/UserProfile'
import NotificationList from './components/NotificationList'
import { useBoundStore } from './store'
import TopAppBar from './components/navigation/TopAppBar'

const App = () => {
  useEffect(() => {
    void useBoundStore.getState().checkAuth()
  }, [])

  return (
    <div className="flex h-screen flex-col bg-gray-700 text-gray-200 min-h-screen">
      <TopAppBar />

      <main className="flex-1 overflow-y-auto p-2 space-y-2 pb-24">
        <NotificationList />

        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </main>

      <NavBar />
    </div>
  )
}

export default App
