interface StepsProps {
  steps: {
    content: string
    id: number
    recipeId: number
    stepNumber: number
  }[]
}

const StepsView = ({ steps }: StepsProps) => {
  return (
    <div className="flex flex-col">
      {steps.map((step) => (
        <div key={step.id} className="flex flex-row gap-2">
          <div>{step.stepNumber}. </div>
          <div>{step.content}</div>
        </div>
      ))}
    </div>
  )
}

export default StepsView
