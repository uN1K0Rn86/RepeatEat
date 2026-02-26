import { Routes, Route } from 'react-router-dom'

import NavBar from './components/navigation/NavBar'
import HomeView from './components/views/HomeView'
import LoginView from './components/views/LoginView'
import RegisterView from './components/views/RegisterView'
import UserProfile from './components/views/UserProfile'
import RecipeView from './components/views/recipe'
import NotificationList from './components/NotificationList'
import TopAppBar from './components/navigation/TopAppBar'
import AddRecipeForm from './components/views/recipe/AddRecipe'
import RecipeDetailsView from './components/views/recipe/RecipeDetailsView'
import HouseholdView from './components/views/Household'
import { useMe } from './hooks/useUser'

const App = () => {
  const { data: user, isLoading } = useMe()

  if (isLoading) return <div>Loading</div>

  return (
    <div className="flex h-screen flex-col">
      <TopAppBar />

      <main className="flex overflow-y-auto p-2 space-y-2 pb-24 justify-center">
        <NotificationList />

        <Routes>
          <Route path="/" element={user ? <HouseholdView /> : <HomeView />} />
          <Route path="/recipe" element={<RecipeView />} />
          <Route path="/recipe/:id" element={<RecipeDetailsView />} />
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
