interface InfoProps {
  householdId: number
}

const HouseholdInfo = ({ householdId }: InfoProps) => {
  return (
    <div>
      <div>{householdId}</div>
    </div>
  )
}

export default HouseholdInfo
