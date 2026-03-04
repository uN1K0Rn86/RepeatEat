import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const InstallPopover = () => {
  const { t } = useTranslation(['common'])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button">{t('common:install')}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>{t('common:install_prompt')}</p>
      </PopoverContent>
    </Popover>
  )
}

export default InstallPopover
