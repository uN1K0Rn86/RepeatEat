import type { ComponentProps } from 'react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface ResponseButtonProps extends ComponentProps<typeof Button> {
  intent: 'positive' | 'neutral' | 'negative'
  text: string
}

const ResponseButton = ({
  intent,
  text,
  className,
  ...props
}: ResponseButtonProps) => {
  const colors = {
    positive: 'bg-green-500 hover:bg-green-600',
    neutral: 'bg-gray-500 hover:bg-gray-600',
    negative: 'bg-destructive hover:bg-destructive/90',
  }

  return (
    <Button className={cn(colors[intent], className)} {...props}>
      {text}
    </Button>
  )
}

export default ResponseButton
