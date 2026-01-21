import { useBoundStore } from '../store'
import Button from './Button'

const UserProfile = () => {
  const user = useBoundStore((state) => state.user)

  if (!user) return <div>Please sign in to view profile</div>

  return (
    <div>
      <div className="flex gap-4">
        <div>Name: {user.name}</div>
        <Button onClick={() => alert('Coming')}>Modify</Button>
      </div>
    </div>
  )
}

export default UserProfile
