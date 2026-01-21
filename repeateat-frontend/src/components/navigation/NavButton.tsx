import type { ReactNode, MouseEventHandler } from 'react'

interface NavButtonProps {
  icon: ReactNode
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
  active?: boolean
}

const NavButton = ({
  icon,
  label,
  onClick,
  active = false,
}: NavButtonProps) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center flex-1 gap-1 transition-colors
      ${active ? 'text-green-500' : 'text-gray-500 hover:text-green-700'}`}
  >
    {icon}
    <span className="text-[10px] font-medium uppercase tracking-wider">
      {label}
    </span>
  </button>
)

export default NavButton
