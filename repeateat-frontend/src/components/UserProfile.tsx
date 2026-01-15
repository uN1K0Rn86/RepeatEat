import { useEffect, useState } from 'react'
import userService from '../services/users'
import type { User } from 'better-auth'

import Button from './Button'

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo: User = await userService.me()
        setUser(userInfo)
        console.log(userInfo)
      } catch (error) {
        console.error('Failed to fetch user info:', error)
      }
    }

    void fetchUser()
  }, [])

  if (!user) return <div>Please sign in to view profile</div>

  return (
    <div>
      <div className="flex">
        <div>Name: {user.name}</div>
        <Button onClick={() => alert('Coming')}>Modify</Button>
      </div>
    </div>
  )
}

export default UserProfile
