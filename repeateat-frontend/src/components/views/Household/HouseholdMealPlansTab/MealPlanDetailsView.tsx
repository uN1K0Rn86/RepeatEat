import { useParams } from 'react-router-dom'

const MealPlanDetailsView = () => {
  const { id: mealPlanId } = useParams()
  console.log(mealPlanId)
  return (
    <div>
      <div></div>
    </div>
  )
}

export default MealPlanDetailsView
