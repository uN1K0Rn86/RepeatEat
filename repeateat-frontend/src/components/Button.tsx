type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, ...props }: ButtonProps) => {
  const baseStyles =
    'bg-amber-100 px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'
  return (
    <button className={`${baseStyles}`} {...props}>
      {children}
    </button>
  )
}

export default Button
