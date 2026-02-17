import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { HouseholdMember } from '@repeateat/shared'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface MemberDropdownProps {
  self: boolean
  member: HouseholdMember
}

const MemberDropdown = ({ self, member }: MemberDropdownProps) => {
  const { t } = useTranslation(['common', 'household'])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <span className="sr-only">{t('common:open_menu')}</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('common:actions')}</DropdownMenuLabel>
        {self && (
          <DropdownMenuItem onClick={() => console.log('leave')}>
            {t('household:leave_household')}
          </DropdownMenuItem>
        )}
        {!self && member.role === 'member' && (
          <div>
            <DropdownMenuItem onClick={() => console.log('make admin')}>
              {t('household:make_admin')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('kick')}>
              {t('household:kick')}
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MemberDropdown
