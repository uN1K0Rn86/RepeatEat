import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import { useBoundStore } from './store'
import NavBar from './components/navigation/NavBar'
import HomeView from './components/views/HomeView'
import LoginView from './components/views/LoginView'
import RegisterView from './components/views/RegisterView'
import UserProfile from './components/views/UserProfile'
import RecipeView from './components/views/recipe'
import NotificationList from './components/NotificationList'
import TopAppBar from './components/navigation/TopAppBar'
import AddRecipeForm from './components/views/recipe/addRecipe'

const App = () => {
  useEffect(() => {
    void useBoundStore.getState().checkAuth()
  }, [])

  return (
    <div className="flex h-screen flex-col">
      <TopAppBar />

      <main className="flex-1 overflow-y-auto p-2 space-y-2 pb-24">
        <NotificationList />

        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/recipe" element={<RecipeView />} />
          <Route path="/recipe/add" element={<AddRecipeForm />} />
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
