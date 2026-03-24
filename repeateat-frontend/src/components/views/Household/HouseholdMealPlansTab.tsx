import { useOutletContext } from 'react-router-dom'

import { type UserHousehold } from '@repeateat/shared'

const HouseholdMealPlansTab = () => {
  const { household } = useOutletContext<{ household: UserHousehold }>()
  console.log(household)
  return (
    <div>
      <div></div>
    </div>
  )
}

export default HouseholdMealPlansTab
