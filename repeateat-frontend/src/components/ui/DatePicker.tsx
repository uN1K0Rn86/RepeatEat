import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import type { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from './calendar'

interface DatePickerProps {
  date: Date | undefined
  setDate: Dispatch<SetStateAction<Date>>
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  const { t } = useTranslation(['common'])
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? (
            format(date, 'yyyy-MM-dd')
          ) : (
            <span>{t('common:pick_date')}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <Calendar mode="single" selected={date} onSelect={setDate} required />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
