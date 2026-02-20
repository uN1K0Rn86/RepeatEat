import type { UserDropdownMenuProps } from '@/components/navigation/UserDropdownMenu'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ResponseButton from '@/components/ui/ResponseButton'
import { useAcceptInvite, useDeclineInvite } from '@/hooks/useInvite'
import type { Invite } from '@repeateat/shared'
import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const UserInvites = ({ user }: UserDropdownMenuProps) => {
  const { t } = useTranslation(['household', 'common'])
  const { mutate: acceptInvite, isPending } = useAcceptInvite()
  const { mutate: declineInvite, isPending: isPendingDecline } =
    useDeclineInvite()

  const handleAccept = (invite: Invite) => {
    acceptInvite(invite)
  }

  const handleDecline = (invite: Invite) => {
    declineInvite(invite)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative">
          <Mail />
          {user.invites.length}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {t('household:household_invites')}
        </DropdownMenuLabel>
        {user.invites.map((i: Invite) => (
          <div key={i.id}>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              aria-label="Accept Invite"
              className="flex flex-col"
            >
              <div>{`${t('household:household')}: ${i.household.name}`}</div>
              <div className="flex gap-2">
                <ResponseButton
                  intent="positive"
                  text={isPending ? t('common:loading') : t('household:accept')}
                  onClick={() => handleAccept(i)}
                />
                <ResponseButton
                  intent="negative"
                  text={
                    isPendingDecline
                      ? t('common:loading')
                      : t('household:decline')
                  }
                  onClick={() => handleDecline(i)}
                />
              </div>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserInvites
