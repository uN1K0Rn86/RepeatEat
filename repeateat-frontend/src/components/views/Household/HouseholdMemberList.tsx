import { useTranslation } from 'react-i18next'
import { useMe } from '@/hooks/useUser'
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { type HouseholdMember } from '@repeateat/shared'
import type { InfoProps } from './HouseholdInfo'
import MemberDropdown from './MemberDropdown'
import AddMemberForm from './AddMemberForm'

const HouseholdMemberList = ({ household }: InfoProps) => {
  const { t } = useTranslation(['household', 'common'])
  const { data: user } = useMe()
  return (
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
                  {m.role === 'admin' && <Badge>{t('household:admin')}</Badge>}
                </div>
                {household.role === 'admin' && (
                  <MemberDropdown self={self} member={m} />
                )}
              </div>
            )
          })}
        {household.role === 'admin' && <AddMemberForm household={household} />}
      </AccordionContent>
    </AccordionItem>
  )
}

export default HouseholdMemberList
