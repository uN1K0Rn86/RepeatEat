import { useId } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const Input = ({ label, ...props }: InputProps) => {
  const generatedId = useId()
  const inputId = generatedId

  return (
    <div className="flex gap-2 items-center justify-center">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        {...props}
        id={inputId}
        className="border border-black rounded px-2 py-1"
      />
    </div>
  )
}

export default Input
