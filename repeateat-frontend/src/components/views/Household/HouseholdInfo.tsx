import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import MemberDropdown from './MemberDropdown'
import type { HouseholdMember, UserHousehold } from '@repeateat/shared'
import { Home } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface InfoProps {
  household: UserHousehold
}

const HouseholdInfo = ({ household }: InfoProps) => {
  const { t } = useTranslation(['household', 'common'])

  return (
    <div>
      <Accordion className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 font-bold">
          <Home />
          {household.name}
        </div>
        <Separator />
        <AccordionItem value="members">
          <AccordionTrigger>{t('household:members')}</AccordionTrigger>
          <AccordionContent>
            {household.members.map((m: HouseholdMember) => (
              <div key={m.id} className="flex flex-row justify-between">
                <div>{m.name}</div>
                {household.role === 'admin' && <MemberDropdown />}
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="recipes">
          <AccordionTrigger>{t('common:recipes')}</AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default HouseholdInfo
