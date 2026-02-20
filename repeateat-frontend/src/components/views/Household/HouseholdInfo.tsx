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
import { Badge } from '@/components/ui/badge'
import AddMemberForm from './AddMemberForm'
import { useMe } from '@/hooks/useUser'

export interface InfoProps {
  household: UserHousehold
}

const HouseholdInfo = ({ household }: InfoProps) => {
  const { t } = useTranslation(['household', 'common'])
  const { data: user } = useMe()

  return (
    <div>
      <Accordion className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 font-bold">
          <Home />
          {household.name}
        </div>
        <Separator />
        <AccordionItem value="members">
          <AccordionTrigger className="font-bold">
            {t('household:members')}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            {user &&
              household.members.map((m: HouseholdMember) => {
                const self = user.id === m.id
                return (
                  <div key={m.id} className="flex flex-row justify-between">
                    <div className="flex items-center gap-2">
                      <span>{m.name}</span>
                      {m.role === 'admin' && (
                        <Badge>{t('household:admin')}</Badge>
                      )}
                    </div>
                    {household.role === 'admin' && (
                      <MemberDropdown self={self} member={m} />
                    )}
                  </div>
                )
              })}
            {household.role === 'admin' && (
              <AddMemberForm household={household} />
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="recipes">
          <AccordionTrigger className="font-bold">
            {t('common:recipes')}
          </AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default HouseholdInfo
