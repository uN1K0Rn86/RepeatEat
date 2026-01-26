import { useId } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const InputOld = ({ label, ...props }: InputProps) => {
  const generatedId = useId()
  const inputId = generatedId

  return (
    <div className="display: contents">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        {...props}
        id={inputId}
        className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  )
}

export default InputOld
