import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLogCook, useUserHouseholds } from '@/hooks/useHousehold'
import { useBoundStore } from '@/store'
import { useTranslation } from 'react-i18next'
import { Check, Plus } from 'lucide-react'
import DatePicker from '@/components/ui/DatePicker'
import { notify } from '@/utils/notify'

interface FormProps {
  recipeId: string
  source: 'list' | 'view'
}

const MarkAsCookedButton = ({ recipeId, source }: FormProps) => {
  const { t } = useTranslation(['household', 'errors'])
  const { data: userHouseholds } = useUserHouseholds()
  const { activeHouseholdId } = useBoundStore()
  const [selectedHouseholdId, setSelectedHouseholdId] = useState<number | null>(
    activeHouseholdId,
  )
  const [cookedAt, setCookedAt] = useState<Date>(() => new Date())
  const cookLogMutation = useLogCook()

  const effectiveHouseholdId =
    selectedHouseholdId ??
    (userHouseholds?.length === 1 ? userHouseholds[0].householdId : null)

  const handleSubmit = () => {
    if (!effectiveHouseholdId) {
      notify.error(t('errors:choose_household'))
      return
    }
    cookLogMutation.mutate(
      {
        recipeId: Number(recipeId),
        householdId: effectiveHouseholdId,
        notes: '',
        cookedAt,
      },
      {
        onSuccess: () => {
          setCookedAt(new Date())
        },
      },
    )
  }

  const stopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation()
  }

  return (
    <div className="ml-auto" onClick={stopPropagation}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" onClick={stopPropagation}>
            {source === 'list' ? <Plus /> : t('household:log_cook')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={stopPropagation}>
          {userHouseholds && userHouseholds.length > 1 && (
            <>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger onClick={stopPropagation}>
                  {t('household:household')}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent onClick={stopPropagation}>
                  {userHouseholds.map((h) => (
                    <DropdownMenuItem
                      key={h.householdId}
                      onClick={() => setSelectedHouseholdId(h.householdId)}
                      onSelect={(e: Event) => e.preventDefault()}
                      className="flex flex-row justify-between"
                    >
                      <div>{h.name}</div>
                      {selectedHouseholdId === h.householdId && <Check />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
            </>
          )}
          <div
            className="flex flex-col gap-1 px-2 py-1 text-sm"
            onClick={stopPropagation}
          >
            {t('recipe:prep_date')}:
            <DatePicker date={cookedAt} setDate={setCookedAt} />
          </div>
          <DropdownMenuItem className="flex flex-row justify-center">
            <Button type="button" onClick={handleSubmit}>
              {t('household:log')}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default MarkAsCookedButton
